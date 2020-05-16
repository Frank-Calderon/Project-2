$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then((data) => {
    console.log(data.infected);
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
const locate = document.getElementById('locate');
const placeRow = document.getElementById('placeRow');
const checkIn = document.getElementById('Checkin');
const checkOut = document.getElementById('Checkout');
const infected = document.getElementById('Infected');
const infAlert = document.getElementById('infAlert');
const healed = document.getElementById('Healed');
const hlAlert = document.getElementById('hlAlert');
const miAlert = document.getElementById('miAlert');

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
    const places = [];
    for (let i = 0; i <res.results.length; i++) {
      const place = res.results[i].name;
      const placess = JSON.stringify(place);
      const $li = '<li>' + placess + '</li>';
      // const selectBtn = '<button id="selectBtn"> Select</button>';
      // $li.append(selectBtn);
      places.push($li);
      locate.innerHTML = places;
      console.log(places);
    }
    // locate.innerHTML = '<li>' + res.results[0].name + '</li>';
    console.log(res.results);
  });

  $.get('/api/user_data').then(function(data) {
    $.post('/api/a', {
      userId: data.id,
      lat: latitude,
      lon: longitude,
    });
  });

  console.log('Checked In');
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
  console.log('Infected');
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
  console.log('Healed');
});

$('#Checkout').on('click', function(event) {
  event.preventDefault();
  checkOut.style.display='none';
  infected.style.display='none';
  healed.style.display='none';
  checkIn.style.display='block';
  console.log('Checked Out');
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

// let places = [];
// for (let i = 0; i <res.length; i++) {
//   const place = res[i];
//   const li = '<li>' + place + '</li>';
//   const selectBtn = '<button id="selectBtn"> Select</button>';
//   li.append(selectBtn);
//   places.push(li);
//   locate.append(places);
// }
initMap();
