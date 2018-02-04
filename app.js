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