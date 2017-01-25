
var OWM_KEY = "398481d091936111a0dfa4a95ea8b11e"; // OpenWeatherMap api key

var userCoordinates = {
    "lat": -1.0, "lon": -1.0
  };

var wheaterData;  //data returned from API

var isCelsius = true; // flag

$(document).ready(function(){  
  $(".temperature").hide();
  $(".user-location").hide();
  $(".icon-tempe").hide();

  getCoordinates(getWeather);
    
});

/**
 * Get and configure the user coordinates
 * @param  {Function} callback 
 *           
 */
function getCoordinates(callback)
{
  $.get("http://ipinfo.io", function(response) {
  var loc = response.loc.split(",");
  userCoordinates.lat = loc[0];
  userCoordinates.lon = loc[1];  
    
  callback();

  }, "jsonp");
}

/**
 * Get and display the weather 
 */
function getWeather()
{  
  var url = "http://api.openweathermap.org/data/2.5/weather?lat="+ userCoordinates.lat +"&lon="+userCoordinates.lon +
 	"&units=metric&APPID="+OWM_KEY;

 	$.getJSON(url, function(data){

  	wheaterData = data;
    
  	document.getElementById("user-city").innerHTML = wheaterData.name;
  	document.getElementById("user-country").innerHTML  = wheaterData.sys.country;
  	document.getElementById("number-tempe").innerHTML = wheaterData.main.temp.toFixed(1);
    document.getElementById("i-tempe").src = "http://openweathermap.org/img/w/"+wheaterData.weather[0].icon +".png";
      
    $(".temperature").fadeIn(2000);
    $(".user-location").fadeIn(1000);
    $(".icon-tempe").fadeIn();    
 
 	});
  
}

// celsius to fahrenheit
function cToF()
{
	if(isCelsius)
	{
		var tempe = document.getElementById("number-tempe").innerHTML;
		document.getElementById("number-tempe").innerHTML = ((tempe * 1.8) + 32).toFixed(1);
		document.getElementById("format-tempe").innerHTML = "F";
	}

	isCelsius = false;
}

// fahrenheit to celsius
function fToC()
{
	if(!isCelsius)
	{
		var tempe = document.getElementById("number-tempe").innerHTML;
		document.getElementById("number-tempe").innerHTML = ((tempe - 32) / 1.8).toFixed(1);
		document.getElementById("format-tempe").innerHTML = "C";
	}

	isCelsius = true;
	
}