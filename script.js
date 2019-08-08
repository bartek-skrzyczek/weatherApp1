let appId = "9dba112118cf4676909c78c0a170e22e";
let units = "imperial";
let searchMethod;
let loader =  document.getElementById("loader");

function getSearchMethod(searchTerm){
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm) {
        searchMethod = "zip";
    }
    else {
        searchMethod = "q";
    }
}

function searchWeather(searchTerm) {
    
    loader.classList.remove("hidden");
    getSearchMethod(searchTerm);
    fetch(`https:\\api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    switch(resultFromServer.weather[0].main){
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("thunderstorm.jpg")';
            break;

        case 'Drizzle':
            document.body.style.backgroundImage = 'url("drizzle.jpg")';
            break;

        case 'Rain':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;

        case 'Mist':
            document.body.style.backgroundImage = 'url("mist.jpg")';
            break;

        case 'Smoke':
            break;

        case 'Haze':
            break;

        case 'Dust':
            break;

        default:
            break;
    }

    console.log(resultFromServer);
    loader.classList.add("hidden");
    let weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
    let temp = document.getElementById("temp");
    let humidity = document.getElementById("humidity");
    let windSpeed = document.getElementById("windSpeed");
    let cityName = document.getElementById("cityName");
    let weatherIcon = document.getElementById("documentIconImg");

    cityName.innerHTML = resultFromServer.name;
    weatherIcon.src = "http://openweathermap.org/img/wn/" + resultFromServer.weather[0].icon + "@2x.png";
    let description = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultFromServer.weather[0].description.charAt(0).toUpperCase() + description.slice(1);
    temp.innerHTML = Math.floor(resultFromServer.main.temp) + "&#176";
    humidity.innerHTML = resultFromServer.main.humidity;
    windSpeed.innerHTML = resultFromServer.wind.speed;
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById("searchInput").value;
    if(searchTerm) searchWeather(searchTerm);
})