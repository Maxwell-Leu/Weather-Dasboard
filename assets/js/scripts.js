var form = document.getElementById('form');
var searchedCity = document.getElementById('searchedCity');
var apiKey = '06aaafc7b6ed5e5c600f7d5e36d93055'

function generate5Day(lat, lon){
    
}

function getLatLon(event){
    event.preventDefault();
    var postiionUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity.value}&limit=1&appid=${apiKey}`
    var lat;
    var lon;
    fetch(postiionUrl)
        .then(function(response){
           return response.json();
        })
        .then(function(data){
            console.log(data);
            lat = data[0].lat;
            lon = data[0].lon;
            generate5Day(lat, lon);
        })
    
}

form.addEventListener('submit', getLatLon);