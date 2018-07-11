var queryURL =
  'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=animals';

//create animals array
var animals = ['dog', 'cat', 'mouse', 'bird'];
function renderButtons() {
  $('#buttons-placeholder').empty();
  for (var i = 0; i < animals.length; i++) {
    var button = $('<button>');
    button.addClass('animal btn btn-info m-2');
    button.attr('data-name', animals[i]);
    button.text(animals[i]);
    $('#buttons-placeholder').append(button);
  }
}

$('#btn-submit').on('click', function(event) {
  event.preventDefault();
  var addAnimal = $('#input-add')
    .val()
    .trim();
  animals.push(addAnimal);
  renderButtons();
  addAnimal.val = '';
});

$(document.body).on('click', '.animal', function() {
  // Storing our giphy API URL for a random cat image
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    var imgUrl = response.data.image_original_url;
    animalImg = $('<img>');
    animalImg.attr('src', imgUrl);
    animalImg.attr('alt', 'animal image');
    animalImg.addClass('w-25 m-2');
    $('#gifts-placeholder').append(animalImg);
  });
});
$(document.body).on('click', '.animal', function() {});

renderButtons();
