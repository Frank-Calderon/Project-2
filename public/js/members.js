$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then((data) => {
    $('.member-name').text(data.email);
    if (data.infected == '2') {
      infAlert.style.display='block';
      hlAlert.style.display='none';
    } else if (data.infected == '0') {
      infAlert.style.display='none';
      hlAlert.style.display='block';
    } else if (data.infected == '1') {
      miAlert.style.display='block';
    }
  });
});


let latitude;
let longitude;
// Enviromnemtal Variable to hid the API KEY
// const apiKey = process.env.API_KEY;
const locate = document.getElementById('locate');
const placeRow = document.getElementById('placeRow');
const checkIn = document.getElementById('Checkin');
const checkOut = document.getElementById('Checkout');
const infected = document.getElementById('Infected');
const infAlert = document.getElementById('infAlert');
const healed = document.getElementById('Healed');
const hlAlert = document.getElementById('hlAlert');
const miAlert = document.getElementById('miAlert');
const locations = document.getElementById('locations');
const places = [];
let currentId = 0;

$('#Checkin').on('click', function(event) {
  event.preventDefault();
  checkIn.style.display='none';
  infected.style.display='block';
  healed.style.display='block';
  checkOut.style.display='block';
  const queryUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&rankby=distance&key=AIzaSyCM3_vNP4ArN-3FoXycnbdjsdzuJd_vLzQ';

  $.ajax({
    url: queryUrl,
    method: 'GET',
  }) .then(function(res) {
    placeRow.style.display='block';
    for (let i = 0; i <res.results.length; i++) {
      const place = res.results[i].name;
      places.push(place);
      const div = document.createElement('div');
      div.id = places.length-1;
      div.innerHTML=place+' <button class="selectBtn">Select</button><br><br>';
      locate.append(div);
    }
  });

  locate.addEventListener('click', function(event) {
    if (event.target.matches('button')) {
      event.preventDefault();
      currentId = parseInt(event.target.parentElement.id);
      const name = places[currentId];
      const divs = document.createElement('div');
      divs.innerHTML = name + '<br><br>';
      $(locations).append(divs);
    }
  });

  $.get('/api/user_data').then(function(data) {
    $.post('/api/a', {
      userId: data.id,
      lat: latitude,
      lon: longitude,
      status: true,
    });
  });
});

$('#Infected').on('click', function(event) {
  event.preventDefault();
  infAlert.style.display='block';
  hlAlert.style.display='none';
  // eslint-disable-next-line no-invalid-this
  const newInfected = $(this).data('infected');
  $.get('/api/user_data').then(function(data) {
    const id = data.id;
    const newInfectedState = {
      infected: newInfected,
    };
    $.ajax('/api/infected/' + id, {
      type: 'PUT',
      data: newInfectedState,
    });
  });
});

$('#Healed').on('click', function(event) {
  event.preventDefault();
  infAlert.style.display='none';
  hlAlert.style.display='block';
  // eslint-disable-next-line no-invalid-this
  const newInfected = $(this).data('infected');
  $.get('/api/user_data').then(function(data) {
    const id = data.id;
    const newInfectedState = {
      infected: newInfected,
    };
    $.ajax('/api/healed/' + id, {
      type: 'PUT',
      data: newInfectedState,
    });
  });
});

$('#Checkout').on('click', function(event) {
  event.preventDefault();
  checkOut.style.display='none';
  infected.style.display='none';
  healed.style.display='none';
  checkIn.style.display='block';
  $.get('api/user_data').then(function(data) {
    const id = data.id;
    $.ajax('/api/checkout/' + id, {
      type: 'PUT',
      data: {status: false},
    });
  });
});

let map; let infoWindow;
// eslint-disable-next-line require-jsdoc
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      latitude = pos.lat;
      longitude = pos.lng;

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

// eslint-disable-next-line require-jsdoc
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
