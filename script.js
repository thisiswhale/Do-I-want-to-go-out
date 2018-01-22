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

            let imageURL;
            let forecast = data.weather[0].main.toLowerCase();
            console.log(forecast, forecast.includes('clear'))
            switch(true){
              case forecast.includes('clear'):
                imageURL ='http://1.bp.blogspot.com/-ZIgQPOdgFgE/VDjiG4MC3qI/AAAAAAAAAbw/Meer1Oz103U/s1600/Seaside-beach-view-clear-sky-sand-blue-sea-theme-wallpapers-download.jpg'
                break;
              case forecast.includes('sunny'):
                imageURL = 'http://www.ijunoon.com/sw-store/images/timthumb.php?src=http://www.ijunoon.com/sw-store/images/wallpapers/ijunoon_Aston-Martin-DP-100-Vision-Gran-Turismo-Concept84317.jpg&q=100&w=1920&h=1080'
                break;
              case forecast.includes('fog'):
                imageURL ='http://architectureimg.com/wp-content/uploads/2017/05/skyscrapers-hong-kong-foggy-city-fog-lights-night-dark-mist-wallpaper-for-desktop.jpg'
                break;
              case forecast.includes('cloud'):
                imageURL='https://img00.deviantart.net/a191/i/2005/180/8/8/cloudy_seattle_by_logantscott.jpg'
                break;
              case forecast.includes('thunderstorm'):
                imageURL='http://www.topraklamaraporu.org/wp-content/uploads/2016/12/paratoner.jpg'
                break;
              case forecast.includes('shower')|| forecast.includes('rain'):
                imageURL='http://gzsihai.com/data/out/262/im-501019635.jpg'
                break;
              case forecast.includes('snow'):
                imageURL='http://thewallpaper.co/wp-content/uploads/2017/09/storm-snow-download-mather-nature-winter-background-images-weather-sky-natureandroid-rain-christmas-clouds-river.jpg'
                break;
              default:
                imageURL='http://getwallpapers.com/wallpaper/full/4/7/6/566735.jpg';
            }
            document.body.style.backgroundImage = "url('" +imageURL +"')";
          })
          .catch( (err) =>err );
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
