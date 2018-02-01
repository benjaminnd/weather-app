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
        initMap(latitude, longitude);
      });
      initMap(latitude, longitude); //Generate map using current location as center
    });
  }else{
    alert('Geolocation is not supported');
  }
}
function initMap(lat, long) {
  var map = new GMaps({
    el: '#map',
    zoom: 2,
    lat: lat,
    lng: long
  })
}
