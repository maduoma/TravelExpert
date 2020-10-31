// create an array object and assign it to a variable travelLocations
const travelLocations = [
  {
    name: 'Zuma Rock',
    location: 'Zuma Rock',
    imgURL: '../images-jpg/aso-rock.jpg',
    extURL: 'https://en.wikipedia.org/wiki/Abuja'
  },
  {
    name: 'Eiffel Tower',
    location: 'Eiffel Tower',
    imgURL: '../images-jpg/eiffle-tower.jpg',
    extURL: 'https://en.wikipedia.org/wiki/Paris'
  },
  {
    name: 'Time Square',
    location: 'Time Square',
    imgURL: '../images-jpg/times-square.jpg',
    extURL: 'https://en.wikipedia.org/wiki/New_York_City'
  },
  {
    name: 'Calgary Tower',
    location: 'Calgary Tower',
    imgURL: '../images-jpg/calgary-tower.jpg',
    extURL: 'https://en.wikipedia.org/wiki/Calgary'
  },
  {
    name: 'Nathan Phillips Square',
    location: 'Nathan Philips square',
    imgURL: '../images-jpg/nathan-phillips-square.jpg',
    extURL: 'https://en.wikipedia.org/wiki/Toronto'
  },
  {
    name: 'Granville Island',
    location: 'Granville Island',
    imgURL: '../images-jpg/granville-island.jpg',
    extURL: 'https://en.wikipedia.org/wiki/Vancouver'
  }

];

// using the array object created above, assign a iterator "content" using let
// also use a forEach to set a function that will loop throug the array
// to carry out the function assigned to it.

let content = '';
travelLocations.forEach(function (travelLocation) {
  content += `<div><h6>${travelLocation.location}</h6>
  <a href="${travelLocation.extURL}  target="_blank" "><img width="350" height="300" src="${travelLocation.imgURL}" 
  alt="Tourist Atraction of : ${travelLocation.name}"></a></div>
          `;
});

// use query selector to link the array and functions to the correct
// html container.
const main = document.querySelector('.photos');
main.innerHTML = content;
