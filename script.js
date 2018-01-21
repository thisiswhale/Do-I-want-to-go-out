function geoFindMe() {
  let err = document.getElementById("error-box");

  if (!navigator.geolocation){
    err.innerHTML = "Geolocation is not supported by your browser";
    return;
  }

  function success(position) {
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude)
  }

  function error() {
    err.innerHTML = "Unable to retrieve your location";
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

function getWeather(lat, long){
  let tempReader = document.getElementById('temp-reader');
  let locationReader = document.getElementById('location-reader');
  let windReader = document.getElementById('wind-reader');
  let descReader = document.getElementById('desc-reader');

  let url = 'https://fcc-weather-api.glitch.me/api/current?lat='+lat+'&lon='+long;

  fetch(url).then((response) => response.json())
          .then( (data)=> {
            tempReader.innerHTML = data.main.temp +"°C";
            tempReader.setAttribute('data-temp', data.main.temp);
            tempReader.setAttribute('data-temp-unit', 'celsius');
            locationReader.innerHTML = data.name +' , ' +data.sys.country;
            windReader.innerHTML = data.wind.speed +" km/h";
            descReader.innerHTML = data.weather[0].description;
          })
          .catch( (err) =>err )
}
function convertTemp(){
  let tempReader = document.getElementById('temp-reader');
  let tempUnit = tempReader.getAttribute('data-temp-unit');
  let number = tempReader.getAttribute('data-temp');

  if(tempUnit == 'celsius'){
    //convert to Fahrenheit
     const fahrenheit = (number*1.8+32).toFixed(1);
     tempReader.innerHTML = fahrenheit +"°F";
     tempReader.setAttribute('data-temp', fahrenheit);
     tempReader.setAttribute('data-temp-unit', 'fahrenheit');
  }
  else{
    const celsius = ((number - 32)*0.56).toFixed(1);
    tempReader.innerHTML = celsius +"°C";
    tempReader.setAttribute('data-temp', celsius);
    tempReader.setAttribute('data-temp-unit', 'celsius');
  }

}


geoFindMe();
