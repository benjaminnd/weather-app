<<<<<<< HEAD
var latitude;
var longitude;
=======
<<<<<<< HEAD
var latitude;
var longitude;
=======
<<<<<<< HEAD
var latitude;
var longitude;
=======
<<<<<<< HEAD
var latitude;
var longitude;
=======
<<<<<<< HEAD
var latitude = "lat=";
var longitude = "lon=";
>>>>>>> 1f270e402b69406338c7f9ff128af574dc802492
>>>>>>> 411f8d377142c16e77446918a1eb5fbef5c9ed83
>>>>>>> 65d452eac06a16ee9cc522a1e5710de8547b9029
>>>>>>> d4fb3112fdb0a0b6d5e1bc971711f457f395030c
var city;
var weatherType;
var tempC;
var windSpeed;
var icon;
var tempF;
var api = "https://fcc-weather-api.glitch.me/api/current?"

$(document).ready(function(){
  currentPositionWeather();  //call currentPositionWeather to show weather in current location
  //Convert temperature from Celcius to Fahrenheit and vice versa when users click on the button
  $("#cityinput").keyup(function(){
    var autocomplete = new google.maps.places.Autocomplete(this,  {types: ['(cities)']});
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
     var place = autocomplete.getPlace();
     var lat = place.geometry.location.lat();
     var lng = place.geometry.location.lng();
     showMap(lat, lng);
     getWeather(lat, lng);
    });
  });
  $("#temp").click(function(){
    var unit = $("#unit").text(); //get temporary unit
    var currentTemp = $("#temp").text(); //get current temperature
    //If current unit is Celcius change new unit to F and vice versa
    var newUnit = (unit.charCodeAt(0)== 8451)? "&#8457" : "&#8451";
    console.log(newUnit);
    $("#unit").html(newUnit);
    //show temperature accordingly
    unit = $("#unit").text();
    $("#temp").html((unit.charCodeAt(0)== 8451)? tempC : tempF.toFixed(2));

  });
  //This function uses geolocation to get user's current location's coordinates and sends request to weather API
  function currentPositionWeather(){
    if(navigator.geolocation){ //if browser supports geolocation
      navigator.geolocation.getCurrentPosition(function(position){
        //get current location's coordinates
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        //get weather info using current coordinates
        getWeather(latitude, longitude);
        showMap(latitude, longitude);
      });
<<<<<<< HEAD
    }else{
      alert('Geolocation is not supported');
=======
<<<<<<< HEAD
    }else{
      alert('Geolocation is not supported');
=======
<<<<<<< HEAD
    }else{
      alert('Geolocation is not supported');
=======
      //generate map
      initMap(latitude, longitude);
    });
  }else{
    alert('Geolocation is not supported');
  }
}
function initMap(lat, long) {
  var map = new GMaps({
    el: '#map',
    lat: lat,
    lng: long
  })
}
<<<<<<< HEAD
=======
=======
var latitude = "lat=";
var longitude = "lon=";
var city;
var weatherType;
var tempC;
var windSpeed;
var icon;
var tempF;
var api = "https://fcc-weather-api.glitch.me/api/current?"

$(document).ready(function(){
  currentPositionWeather();
  initMap();
  console.log(map);
  $("#temp").click(function(){
    var unit = $("#unit").text();
    var currentTemp = $("#temp").text();
    console.log(currentTemp);
    var newUnit;
    if(unit.charCodeAt(0) == 8451){ //if current temp is in C
      newUnit = "&#8457";
      $("#temp").html(tempF.toFixed(2));
      $("#unit").html(newUnit);
    }else{ //if current temp is in F
      newUnit = "&#8451";
      $("#temp").html(tempC);
      $("#unit").html(newUnit);
>>>>>>> 411f8d377142c16e77446918a1eb5fbef5c9ed83
>>>>>>> 65d452eac06a16ee9cc522a1e5710de8547b9029
>>>>>>> d4fb3112fdb0a0b6d5e1bc971711f457f395030c
    }
  };
  function showMap(lat, long) {
    var map = new GMaps({
      el: '#map',
      zoom: 7,
      lat: lat,
      lng: long
    })
  };
  function getWeather(lat, lng){
    //assign to api variable
    completedAPI =  api + 'lat=' + lat + '&' + 'lon=' + lng;
    console.log(completedAPI);
    //get JSON object from API
    jQuery.getJSON(completedAPI, function(data){
      // alert(data.coord.lat);
      city = data.name + ", " + data.sys.country;
      weatherType = data.weather[0].description;
      tempC = data.main.temp;
      tempF = tempC * 1.8 + 32;
      windSpeed = data.wind.speed + " km/h";
      icon ='<img src="' + data.weather[0].icon + '">';
      $("#city").html(city);
      $("#weatherType").html(weatherType);
      $("#temp").html(tempC);
      $("#unit").html("&#8451");
      $("#windSpeed").html(windSpeed);
      $("#icon").html(icon);
    });
  }
<<<<<<< HEAD
});
=======
<<<<<<< HEAD
});
=======
<<<<<<< HEAD
})
=======
}
function initMap() {
  var map = new GMaps({
    el: '#map',
    lat: 43.2557,
    lng: -79.8711
  })
}
>>>>>>> 4d246e8224f0dd7fe60ed02b7d14ea8f3cdcb37d
>>>>>>> 1f270e402b69406338c7f9ff128af574dc802492
>>>>>>> 411f8d377142c16e77446918a1eb5fbef5c9ed83
>>>>>>> 65d452eac06a16ee9cc522a1e5710de8547b9029
>>>>>>> d4fb3112fdb0a0b6d5e1bc971711f457f395030c
