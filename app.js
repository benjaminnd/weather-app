var latitude;
var longitude;
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
     console.log(JSON.stringify(place));
     var lat = place.geometry.location.lat();
     var lng = place.geometry.location.lng();
     showMap(lat, lng, place.formatted_address);
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
        console.log(position);
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        //get weather info using current coordinates
        getWeather(latitude, longitude);
        showMap(latitude, longitude, 'Current Position');
      });
    }else{
      alert('Geolocation is not supported');

    }
  };
  function showMap(lat, long, name) {
    //initiate map
    var map = new GMaps({
      el: '#map',
      zoom: 5,
      lat: lat,
      lng: long
    })
    //create marker on the coordinates
    map.addMarker({
      lat: lat,
      lng: long,
      infoWindow:{
        content: '<h3>'+ name + '</h3>',
        maxWidth: 300
      }
    });
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
});
