let appId = "9dba112118cf4676909c78c0a170e22e";
let units = "imperial";
let loader =  document.getElementById("loader");
//let searchMethod = searchByCity() || searchByGeo();

function searchByGeo(latVal, lonVal) {
    let method = `lat=${latVal}&lon=${lonVal}`;
    searchWeather(method);
};

function searchByCity(searchTerm) {
    let search = `q=${searchTerm}`;
    console.log(search);
    searchWeather(search);
};

function searchWeather(searchMethod) {
    loader.classList.remove("hidden");
    fetch(`https:\\api.openweathermap.org/data/2.5/weather?${searchMethod}&APPID=${appId}`)
        .then(resultFromServer => {
            if (resultFromServer.status !== 200) {
                throw new Error("Not 200 response");
              }
              else {
                return resultFromServer.json();
              }
        })
        .then(resultFromServer => {
            weatherData(resultFromServer);

        })
        .catch(function() {
            loader.classList.add("hidden");
            let error = document.getElementById("weatherDescription");
            error.innerHTML = "Error message content";
        });



  //  fetch(`https:\\api.openweathermap.org/data/2.5/forecast?${"q"}=${searchTerm}&APPID=${appId}&units`)
    //    .then(handleErrors)
      //  .then(forecastResult => {
        //    return forecastResult.json();
       // }).then(forecastResult => {
         //   forecastData(forecastResult);
   // })
//}



function weatherData(resultFromServer) {

    switch(resultFromServer.weather[0].main) {
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

    let searchTerm = document.getElementById("address-input");
    searchTerm.value = resultFromServer.name;

    cityName.innerHTML = resultFromServer.name;
    weatherIcon.src = "http://openweathermap.org/img/wn/" + resultFromServer.weather[0].icon + "@2x.png";
    let description = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultFromServer.weather[0].description.charAt(0).toUpperCase() + description.slice(1);
    temp.innerHTML = "Temperature: " + Math.floor(resultFromServer.main.temp) + "&#176";
    humidity.innerHTML = resultFromServer.main.humidity;
    windSpeed.innerHTML = resultFromServer.wind.speed;
    } 
}

function forecastData(forecastResult){
    console.log(forecastResult);
}

function switchTemp(){
// Prompting the user to enter today's Kelvin temperature
const kelvin = prompt('What is the Kelvin temperature today?');

// Celsius is 273 degrees less than Kelvin
const celsius = kelvin - 273;

// Calculating Fahrenheit temperature to the nearest integer
let fahrenheit = Math.floor(celsius * (9/5) + 32);

// Displaying the temperature using string interpolation
console.log(`The temperature is ${fahrenheit} degrees fahrenheit.`)
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById("address-input").value;
    searchByCity(searchTerm);
})

function myFunction() {
    let result = document.getElementById("address-input").value;
    console.log(result);
    let listItem = document.querySelectorAll("ap-dataset-places");
    console.log(listItem);
    listItem.forEach(function(item) {
    item.onclick = function(e) {
        console.log(this.innerText);
        }
    })
}


