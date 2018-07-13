// 1.- DOM Elements
var inputAdd = $('#input-add');
var btnSubmit = $('#btn-submit');
var btnsPlaceHolder = $('#buttons-placeholder');
var giftsPlaceHolder = $('#gifts-placeholder');

// 2.- Animals Array that we are going to use to autogenerate buttons
var animals = [
  'dog',
  'mouse',
  'cat',
  'bird',
  'cow',
  'bear',
  'lion',
  'sealion',
  'startfish'
];

// 3. This function will generate each button of every element of Animal's Array
function renderButtons() {
  btnsPlaceHolder.empty();
  for (var i = 0; i < animals.length; i++) {
    var button = $('<button>');
    button.addClass('animal btn btn-dark btn-lg text-white m-2');
    button.attr('data-name', animals[i]);
    button.text(animals[i]);
    btnsPlaceHolder.append(button);
  }
}

// 4.- This function (attached to an on.click event) will generate new buttons according to the user input
btnSubmit.on('click', function(event) {
  event.preventDefault();
  var addAnimal = inputAdd
    .val()
    .toLowerCase()
    .trim();
  if (addAnimal.length > 0) {
    animals.push(addAnimal);
    renderButtons();
    inputAdd.val('');
  }
});

// 5.- This function (attached to an on.click event) will perform an AJAX GET request to autogenerate images for every button that the user clicks.
$(document.body).on('click', '.animal', function() {
  giftsPlaceHolder.empty();

  // 5.1 We start by storing our Giphy API URL and our specific element to be call (in this case the name of the animals that we generate before)
  var animalName = $(this).attr('data-name');
  var queryURL =
    'https://api.giphy.com/v1/gifs/search?q=' +
    animalName +
    '&api_key=dc6zaTOxFJmzC&limit=10';

  //5.2 We Perform an AJAX GET request to get a response and some specific elements from it.
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var pg = $('<p>').text('Rating: ' + results[i].rating);
      var imgUrl = results[i].images.fixed_height_still.url;
      var dataStill = results[i].images.fixed_height_still.url;
      var dataAnimate = results[i].images.fixed_height.url;
      var animalImg = $('<img>');
      animalImg.attr('src', imgUrl);
      animalImg.attr('data-still', dataStill);
      animalImg.attr('data-animate', dataAnimate);
      animalImg.attr('data-state', 'still');
      animalImg.attr('alt', animalName);
      animalImg.addClass('gif img-fluid h-75 mt-2');
      var animalDiv = $('<div>');
      animalDiv.addClass('col-sm-3');
      animalDiv.append(pg, animalImg);
      giftsPlaceHolder.append(animalDiv);
    }
  });
});

// 6.- This last function (attached to another on.click event) will allow us to change our image from still to animate everytime that is click it.
$(document.body).on('click', '.gif', function() {
  var state = $(this).attr('data-state');
  if (state === 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  } else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});

// This is the calling to our renderButtons function.
renderButtons();
