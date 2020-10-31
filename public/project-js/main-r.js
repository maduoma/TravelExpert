// Assign form element to variable
const form = document.querySelector('form');

// Add an event listener
// The second argument is an anonymous function that is invoked whenever the form is submited. 

form.addEventListener('submit', function (event) {
  // Stop the form from submitting so we can do things
  // The 'event' object is created by the browser and has many useful methods like this one
  event.preventDefault();

  // Assign the email,passwaord,name,tel,address,city,province,postalcode and message input to a variable
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const name = document.querySelector('#name');
  const tel = document.querySelector('#tel');
  const address = document.querySelector('#address');
  const city = document.querySelector('#city');
  const province = document.querySelector('#province');
  const postalCode = document.querySelector('#postalCode');
  const message = document.querySelector('#message');

  // Simple validation
  if (email.value === '') {

    // Sets the input to 'invalid'
    email.setCustomValidity("Please, email address is required.")

  } else {
    // Sets the input to 'valid'
    email.setCustomValidity('');

    // Run other tests and submit.
    // 'this' is a browser built variable that (in this case) refers to the form element.
    this.submit();
  }
  // Simple validation
  if (password.value === '') {

    // Sets the input to 'invalid'
    password.setCustomValidity("Please, password is required. ")
  } else {

    // Sets the input to 'valid'
    password.setCustomValidity('');

    // Run other tests and submit.
    // 'this' is a browser built variable that (in this case) refers to the form element.
    this.submit();
  }

  // Simple validation
  if (name.value === '') {

    // Sets the input to 'invalid'

    name.setCustomValidity("Please, full name is required. ")
  } else {

    // Sets the input to 'valid'

    name.setCustomValidity('');

    // Run other tests and submit.
    // 'this' is a browser built variable that (in this case) refers to the form element.

    this.submit();
  }

  // Simple validation

  if (tel.value === '') {

    // Sets the input to 'invalid'
    tel.setCustomValidity("Please, phone number is required. ")
  } else {

    // Sets the input to 'valid'

    tel.setCustomValidity('');

    // Run other tests and submit.
    // 'this' is a browser built variable that (in this case) refers to the form element.

    this.submit();
  }

  // Simple validation

  if (address.value === '') {


    // Sets the input to 'invalid'
    address.setCustomValidity("Please, address is required. ")
  } else {

    // Sets the input to 'valid'
    address.setCustomValidity('');

    // Run other tests and submit.
    // 'this' is a browser built variable that (in this case) refers to the form element.

    this.submit();
  }

  // Simple validation

  if (city.value === '') {

    // Sets the input to 'invalid'

    city.setCustomValidity("Please, city is required. ")
  } else {

    // Sets the input to 'valid'

    city.setCustomValidity('');

    // Run other tests and submit.
    // 'this' is a browser built variable that (in this case) refers to the form element.

    this.submit();
  }

  // Simple validation

  if (province.value === '') {

    // Sets the input to 'invalid'

    province.setCustomValidity("Please, province is required. ")
  } else {

    // Sets the input to 'valid'

    city.setCustomValidity('');

    // Run other tests and submit.
    // 'this' is a browser built variable that (in this case) refers to the form element.

    this.submit();
  }

  // Simple validation

  if (postalCode.value === '') {

    // Sets the input to 'invalid'

    postalCode.setCustomValidity("Please, postal code is required. ")

  } else {

    // Sets the input to 'valid'

    postalCode.setCustomValidity('');

    // Run other tests and submit.
    // 'this' is a browser built variable that (in this case) refers to the form element.

    this.submit();
  }
  // Simple validation

  if (message.value === '') {

    // Sets the input to 'invalid'

    message.setCustomValidity("Please, message is required. ")
  } else {

    // Sets the input to 'valid'

    message.setCustomValidity('');

    // Run other tests and submit.
    // 'this' is a browser built variable that (in this case) refers to the form element.

    this.submit();
  }


});


