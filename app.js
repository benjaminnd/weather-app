var latitude;
var longitude;
var city;
var weatherType;
var tempC;
var tempC2;
var windSpeed;
var icon;
var tempF;
var tempF2;
var cors ="https://cors-anywhere.herokuapp.com/";
var api = "http://api.openweathermap.org/data/2.5/weather?APPID=e4dab5da6349091961641db9fa1112b1&";
var mainMap;
var zoomLevel;

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
     getWeather2(lat, lng);

    });
  });

  //Click event handler for temperature button to convert celcius to fahrenheit and vice versa
  $("#temp2").click(function(){
    var unit2 = $("#unit2").text(); //get temporary unit
    // var currentTemp = $("#temp1").text(); //get current temperature
    //If current unit is Celcius change new unit to F and vice versa
    var newUnit = (unit2.charCodeAt(0)== 8451)? "&#8457" : "&#8451";
    console.log(newUnit);
    $("#unit2").html(newUnit);
    //show temperature accordingly
    unit = $("#unit2").text();
    $("#temp2").html((unit.charCodeAt(0)== 8451)? tempC2 : tempF2.toFixed(1));
  });

  $("#temp1").click(function(){
    var unit = $("#unit1").text(); //get temporary unit
    // var currentTemp = $("#temp1").text(); //get current temperature
    //If current unit is Celcius change new unit to F and vice versa
    var newUnit = (unit.charCodeAt(0)== 8451)? "&#8457" : "&#8451";
    console.log(newUnit);
    $("#unit1").html(newUnit);
    //show temperature accordingly
    unit = $("#unit1").text();
    $("#temp1").html((unit.charCodeAt(0)== 8451)? tempC : tempF.toFixed(1));
    console.log(tempF.toFixed(1));
  });
  //This function uses geolocation to get user's current location's coordinates and sends request to weather API
  function currentPositionWeather(){
    if(navigator.geolocation){ //if browser supports geolocation
      navigator.geolocation.getCurrentPosition(function(position){
        //get current location's coordinates
        console.log(position);
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        //get weather info using current coordinates and show Map
        getWeather1(latitude,longitude);
      },error,{enableHighAccuracy: true,timeout: 5000,maximumAge: 0});
    }
  };

  //error handling function that shows default maps
  function error(){
    showMap(43.2326349, -79.8813217, 'Hamilton, ON, Canada');
    getWeather(43.2326349, -79.8813217);
  }
  //function to show map with coordinates and city name as input
  function showMap(lat, long, name, zoom, temp) {
    //initiate map
    console.log(zoom);
    var map = new GMaps({
        el: '#map',
        zoom: zoom,
        lat: lat,
        lng: long,
        click: function(event){
          getWeather2(event.latLng.lat(), event.latLng.lng());
          map.addMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            infoWindow:{
              content: '<h3>'+ city + '</h3>',
              maxWidth: 300
            }
          });
        },
        zoom_changed: function(){
          console.log(map.getZoom());
          zoomLevel = map.getZoom();
        }


    });
    mainMap = map;
    //create marker on the coordinates
    map.addMarker({
      lat: lat,
      lng: long,
      infoWindow:{
        content: '<h3>'+ name + '</h3><p>' + icon + '          ' + temp + '&#8451</p>',
        maxWidth: 300
      }
    });
  };
  //function to display weather at the given coordinates
  function getWeather1(lat, lng){
    //assign to api variable

    completedAPI =  cors + api + 'lat=' + lat + '&' + 'lon=' + lng;
    //get JSON object from API
    jQuery.getJSON(completedAPI, function(data){
      // alert(data.coord.lat)
      var iconURL = 'http://openweathermap.org/img/w/';
      city = data.name + ", " + data.sys.country;
      weatherType = data.weather[0].description;
      tempC = Math.round(data.main.temp - 273.15);
      tempF = tempC * 1.8 + 32;
      windSpeed = data.wind.speed + " km/h";
      icon ='<img src="' + iconURL + data.weather[0].icon + '.png" alt="icon">';
      $("#city1").html(city);
      $("#weatherType1").html(weatherType);
      $("#temp1").html(tempC);
      $("#unit1").html("&#8451");
      $("#windSpeed1").html(windSpeed);
      $("#icon1").html(icon);
      console.log(city);
      showMap(lat,lng,city,10, tempC);
    });

  };
  function getWeather2(lat,lng){
    completedAPI =  cors + api + 'lat=' + lat + '&' + 'lon=' + lng;
    //get JSON object from API
    jQuery.getJSON(completedAPI, function(data){
      // alert(data.coord.lat)
      var iconURL = 'http://openweathermap.org/img/w/';
      city = data.name + ", " + data.sys.country;
      weatherType = data.weather[0].description;
      tempC2 = Math.round(data.main.temp - 273.15);
      tempF2 = tempC2 * 1.8 + 32;
      windSpeed = data.wind.speed + " km/h";
      icon ='<img src="' + iconURL + data.weather[0].icon + '.png" alt="icon">';
      $("#city2").html(city);
      $("#weatherType2").html(weatherType);
      $("#temp2").html(tempC2);
      $("#unit2").html("&#8451");
      $("#windSpeed2").html(windSpeed);
      $("#icon2").html(icon);
      console.log(city);
      showMap(lat,lng,city,zoomLevel, tempC2);
      showItems();
    });
  };

  function showItems(){
    var array = document.getElementsByClassName('toggle');
    console.log(array.length);
    for(var i = 0; i < array.length; i++){
      array[i].classList.remove("hide");
      console.log(array.length);
    }
  };

});
