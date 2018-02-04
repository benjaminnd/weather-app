<<<<<<< HEAD
var latitude;
var longitude;
=======
<<<<<<< HEAD
var latitude = "lat=";
var longitude = "lon=";
>>>>>>> 1f270e402b69406338c7f9ff128af574dc802492
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

  })
})
//This function uses geolocation to get user's current location's coordinates and sends request to weather API
function currentPositionWeather(){
  if(navigator.geolocation){ //if browser supports geolocation
    navigator.geolocation.getCurrentPosition(function(position){
      //get current location's coordinates
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      //assign to api variable
      api += 'lat=' + latitude + '&' + 'lon=' + longitude;
      //get JSON object from API
      jQuery.getJSON(api, function(data){
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
        $("#windSpeed").html(windSpeed);
        $("#icon").html(icon);
      });
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
    }

  })
})
  // api = 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139' ;
  // jQuery.getJSON(api, function(data){
  //   alert(data.coord.lon);
  // });
function currentPositionWeather(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      // console.log(position.coords.latitude + " " + position.coords.longitude);
      latitude += position.coords.latitude;
      longitude += position.coords.longitude;
      api += latitude + '&' + longitude;
      console.log(api);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(longitude);
      console.log(api);
      jQuery.getJSON(api, function(data){
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
        $("#windSpeed").html(windSpeed);
        $("#icon").html(icon);
      });
    });
  }else{
    alert('Geolocation is not supported');
  }
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
