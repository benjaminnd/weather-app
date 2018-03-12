var latitude;
var longitude;
var city;
var weatherType;
var tempC;
var windSpeed;
var icon;
var tempF;
var api = "http://api.openweathermap.org/data/2.5/weather?APPID=e4dab5da6349091961641db9fa1112b1&";
var mainMap;

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

  //Click event handler for temperature button to convert celcius to fahrenheit and vice versa
  $("#temp").click(function(){
    var unit = $("#unit").text(); //get temporary unit
    var currentTemp = $("#temp").text(); //get current temperature
    //If current unit is Celcius change new unit to F and vice versa
    var newUnit = (unit.charCodeAt(0)== 8451)? "&#8457" : "&#8451";
    console.log(newUnit);
    $("#unit").html(newUnit);
    //show temperature accordingly
    unit = $("#unit").text();
    $("#temp").html((unit.charCodeAt(0)== 8451)? tempC : tempF.toFixed(1));

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
<<<<<<< HEAD
        showMap(latitude, longitude, city);
      }, error, {maximumAge:60000, timeout:500, enableHighAccuracy:true});
=======
<<<<<<< HEAD
        showMap(latitude, longitude, city);
      }, error, {maximumAge:60000, timeout:500, enableHighAccuracy:true});
=======
<<<<<<< HEAD
        showMap(latitude, longitude, city);
      }, error, {maximumAge:60000, timeout:500, enableHighAccuracy:true});
=======
        showMap(latitude, longitude, 'Current Position');
      });
    }else{
      alert('Geolocation is not supported');

>>>>>>> d138d6c3205895dfea71017af2c7323cc61cc6b5
>>>>>>> 66c5e1a82ae895485f4f751b47233c00d9783a14
>>>>>>> fecffa8150fd59069f6e8e581d5f8ab8ab7398c7
    }
  };

  //error handling function that shows default maps
  function error(){
    showMap(43.2326349, -79.8813217, 'Hamilton, ON, Canada');
    getWeather(43.2326349, -79.8813217);
  }
  //function to show map with coordinates and city name as input
  function showMap(lat, long, name) {
    //initiate map
    var map = new GMaps({
        el: '#map',
        zoom: 10,
        lat: lat,
        lng: long,
        click: function(event){
          getWeather(event.latLng.lat(), event.latLng.lng());
          showMap(event.latLng.lat(), event.latLng.lng(), city);
          map.addMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            infoWindow:{
              content: '<h3>'+ city + '</h3>',
              maxWidth: 300
            }
          });
        }
    });
    mainMap = map;
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
  //function to display weather at the given coordinates
  function getWeather(lat, lng){
    //assign to api variable
    completedAPI =  api + 'lat=' + lat + '&' + 'lon=' + lng;
    console.log(completedAPI);
    //get JSON object from API
    jQuery.getJSON(completedAPI, function(data){
      // alert(data.coord.lat);
      console.log(data);
      city = data.name + ", " + data.sys.country;
      weatherType = data.weather[0].description;
      tempC = Math.round(data.main.temp - 273.15);
      tempF = tempC * 1.8 + 32;
      windSpeed = data.wind.speed + " km/h";
      icon ='<img src="' + data.weather[0].icon + '">';
      $("#city").html(city);
      $("#weatherType").html(weatherType);
      $("#temp").html(tempC);
      $("#unit").html("&#8451");
      $("#windSpeed").html(windSpeed);
      $("#icon").html(icon);
      console.log(city);
    });
<<<<<<< HEAD
  };
=======
<<<<<<< HEAD
  };
=======
<<<<<<< HEAD
  };
=======
  }
>>>>>>> d138d6c3205895dfea71017af2c7323cc61cc6b5
>>>>>>> 66c5e1a82ae895485f4f751b47233c00d9783a14
>>>>>>> fecffa8150fd59069f6e8e581d5f8ab8ab7398c7
});
