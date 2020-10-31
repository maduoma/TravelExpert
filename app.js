const express = require("express");
const app = express();
const path = require("path");
const streamParser = require("body-parser");
const mysql = require("mysql");
var data = [];
const greeting = require("./greeting");
const fs = require("fs");
const crypto = require("crypto");
const textgen = require("textgen");

// this is to set environment variable in the real world such that if port 8000 is not available, it will listen on the environment variable
// you can set environemt variable by inputting 'set port=5000' in command line for windows
// for mac use 'export port=5000'. This will default your server to listen to this port, but if it is not set in another system, it will listen on port 8000

const port = process.env.port || 8000

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server started on port ${port}`);
});

// use express static to get CSS, Images and Javascript files from subdirectory public
app.use(streamParser.urlencoded({ extended: false }));
app.use(express.static("public", { extensions: ["pug"] }));
// app.use(express.static('public'));

app.set("views", __dirname + "/public/views");
// what engine we will use. wheneve we will use a template, this is the engine we want to use
app.set("view engine", "pug");

app.get("/index", (req, res) => {
  // /to render index page
  res.redirect("/");
});

app.get("/register", (req, res) => {
  // /to render register page
  res.render("register");
});

// app.get("/packages", (req, res) => {
//   // to render package page
//   res.render("packages");
// })

// app.get("/contact", (req, res) => {
//   // /demo, because its a path from the url
//   res.render("contact");
// });

// app.get("/order", (req, res) => {
//   res.render("order");
// })

app.get("/thanks", (req, res) => {
  res.render("thanks");
})


// to create connection with database

const db = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "",
  // this should be commented out before database is created with the synthax below, if not it will throw error
  // database: "nodemysql"
  database: "travelexperts"
});

// to connect to mysql database

db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected..");

});

// to create database

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created ..");

  });
});

// to create table in the database called customerInfo

app.get("/createcustInfo", (req, res) => {
  let sql = " CREATE TABLE custInfo (id int AUTO_INCREMENT,password VARCHAR(30), name VARCHAR(255), phonenum int, email VARCHAR(30), address VARCHAR(100), city VARCHAR (200),province VARCHAR (30),postalCode int,message VARCHAR(500),PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created..");
  });
});


// post form content from register.html form-inline 

app.post("/form-inline", (req, res) => {
  console.log(req.body);
  data[0] = req.body.password
  data[1] = req.body.name;
  data[2] = req.body.phonenum;
  data[3] = req.body.email;
  data[4] = req.body.address;
  data[5] = req.body.city;
  data[6] = req.body.province;
  data[7] = req.body.postalCode;
  data[8] = req.body.message;
  // this is to insert registration form's details above into custInfo table in the database
  var sql = "INSERT INTO `custInfo`(`password`, `name`,"
    + " `phonenum`, `email`, `address`, `city`, `province`,"
    + " `postalCode`, `message`) "
    + "VALUES (?,?,?,?,?,?,?,?,?)";
  db.query(sql, data, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    db.end((err) => {
      if (err) throw err;
    });
  });
  var name = req.body.name;
  res.redirect("/thanks");
});

app.get("/getpost", (req, res) => {
  // this is to select customer information from database
  let sql = 'SELECT * FROM custInfo';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Post fetched..');
  })
})

// to get package information from database and display it on index page
app.get("/", (req, res) => {
  let sql = "select * from packages";
  db.query(sql, (err, packages) => {
    if (err) throw err;
    let location = '';
    packages.forEach(package => {
      let orderurl = "order/" + package.PackageId;
      location += `<figure class=""> <a href=${orderurl} target="_blank">
        <img src="images-jpg/location2.jpg" width="500" height="400" class="" alt="${package.PkgName}">
        <div class ="package">
        <p>Location: <strong>${package.PkgName}</strong> <br>Available : In Winter, ${package.PkgName}, <br> In Summer, ${package.PkgName} <br></p>
        </div>
        </a>
        </figure>`
    });
    res.render("index", { galleryl1: packages, gallery2: location });
  });

});

// to get package information from database and display it on index page
app.get("/packages", (req, res) => {
  let sql = "select * from packages";
  db.query(sql, (err, packages) => {
    if (err) throw err;
    let location = '';
    packages.forEach(package => {
      let orderurl = "order/" + package.PackageId;
      location += `<figure class=""> <a href=${orderurl} target="_blank">
        <img src="images-jpg/location2.jpg" width="500" height="400" class="" alt="${package.PkgName}">
        <div class ="package">
        <p>Location: <strong>${package.PkgName}</strong> <br>Available : In Winter, ${package.PkgName}, <br> In Summer, ${package.PkgName} <br></p>
        </div>
        </a>
        </figure>`
    });
    res.render("packages", { galleryl1: packages, gallery2: location });
  });

});

app.get("/order/:packageChoice", (req, res) => {
  let pkId = req.params.packageChoice;
  let sql = "select * from packages where packageId=?";
  db.query(sql, [pkId], (err, result) => {
    if (err) throw err;
    res.render("order", { pkDetails: result[0] });
  });
});


// to get the contact details of the agents and display them on the contact page
app.get("/contact", (req, res) => {
  let agentsql = "select * from agents";
  db.query(agentsql, (err, result) => {
    if (err) throw err;
    agencies = result;

    let agentssql = "select * from agents where agents.AgencyId = ?";
    db.query(agentssql, ["1"], (err, result2) => {
      if (err) throw err;
      agents1 = result2;
      db.query(agentssql, ["2"], (err, result3) => {
        if (err) throw err;
        agents2 = result3;
        res.render("contact", { agencies: agencies, agentList1: agents1, agentList2: agents2 });
      });
    });

  });
});


// main order form
app.post("/form-inline", (req, res) => {
  let custAccount = req.body.name;
  let custPw = req.body.password;
  let hashpw = crypto.pbkdf2Sync(custPw, hashsalt, 1000, 64, `sha512`).toString('hex');
  let sql = "select * from customers where CustUserID=?"
  db.query(sql, custAccount, (err, result) => {
    if (err) throw err;
    if (hashpw == result[0].CustPasswd) {
      console.log("password is good");
      let insertOrder = "INSERT INTO bookings(BookingDate,BookingNo,TravelerCount,CustomerId,PackageId) VALUES (?,?,?,?,?)";
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let bookingDate = year + "-" + month + "-" + date;
      // https://usefulangle.com/post/187/nodejs-get-date-time
      let bookingNo = textgen.maketext(8)
      let orderInfo = [bookingDate, bookingNo, req.body.travelerCount, result[0].CustomerId, req.body.pkgID];
      db.query(insertOrder, orderInfo, (err, result) => {
        if (err) throw err;
        console.log(result.affectedRows);   // double check this one
      });
      res.redirect('/thanks');
    } else {
      res.send(500, 'wrong account or password')

    };
  });
});

// 404 Page
app.get('*', (req, res) => {
  // res.status(404).send('Sorry, we can NOT find the file reqeusted.');
  // res.render("404");
  res.status(404).render('404');
});