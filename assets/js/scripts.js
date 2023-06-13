var form = document.getElementById('form');
var searchedCity = document.getElementById('searchedCity');
var todayTemp = document.getElementById('todayTemp');
var todayWind = document.getElementById('todayWind');
var todayHumidity = document.getElementById('todayHumidity');
var date = document.getElementById('cityDate');
var apiKey = '06aaafc7b6ed5e5c600f7d5e36d93055'
var fillHistory = document.getElementById('history');
var weatherIcon = document.getElementById('weatherImage');

function generate5Day(lat, lon){
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(weatherUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var today = data.list[0];
            console.log(today);
            date.textContent = searchedCity.value + " " + unixToDate(today.dt);
            weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`)
            todayTemp.textContent = today.main.temp + " F°";
            todayWind.textContent = today.wind.speed + " MPH"
            todayHumidity.textContent = today.main.humidity + " %";
            for(i = 1; i < 6; i++){
                var forecastFill = document.getElementById('day'+i);
                forecastFill.children[0].textContent = unixToDate(data.list[i].dt);
                forecastFill.children[1].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`)
                forecastFill.children[2].children[0].textContent = data.list[i].main.temp + " F°";;
                forecastFill.children[3].children[0].textContent = data.list[i].wind.speed + " MPH";
                forecastFill.children[4].children[0].textContent = data.list[i].main.humidity + " %";
            }
        })
}

function getLatLon(event){
    event.preventDefault();
    var postiionUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity.value}&limit=1&appid=${apiKey}`
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
            var cityName = searchedCity.value
            localStorage.setItem(searchedCity.value, JSON.stringify(cityName));
            var button = document.createElement('button');
            button.setAttribute('id', searchedCity.value);
            button.setAttribute('onclick', "previousSearch(this.id)")
            button.textContent = searchedCity.value;
            fillHistory.appendChild(button);
            generate5Day(lat, lon);
        })
    
}

function previousSearch(city){
    var postiionUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
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
            searchedCity.value = city;
            generate5Day(lat, lon);
        })
    
}

function unixToDate(timeStamp){
    var millSec = (timeStamp*1000);
    var date = new Date(millSec);
    return date.toLocaleDateString("en-US");
}

function saveSearch(cityName){
    if (localStorage.length < 10){
        var key = cityName;
        localStorage.setItem(key,JSON.stringify(cityName));
    }else{
        localStorage.removeItem(localStorage.key(9));
    }
}

function loadLocalStorage(){
    for(i = 0; i < localStorage.length; i++){
        var place = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var button = document.createElement('button');
        button.textContent = place;
        button.setAttribute('id',place);
        button.setAttribute('onclick', "previousSearch(this.id)")
        fillHistory.appendChild(button);
    }
}

form.addEventListener('submit', getLatLon);