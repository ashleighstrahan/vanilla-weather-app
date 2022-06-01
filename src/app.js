function formatDate() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day} ${hour}:${minutes}`;
}

function produceCityWeather(response) {
  let searchedCityReturn =
    response.data.name + ", " + response.data.sys.country;
  let currentDateReturn = formatDate();
  let weatherDescriptionReturn = response.data.weather[0].description;
  let weatherIconCode = response.data.weather[0].icon;
  let weatherIconReturn = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  let temperatureReturn = Math.round(response.data.main.temp);
  let humidityReturn = response.data.main.humidity;
  let windReturn = response.data.wind.speed;

  let searchedCityDisplay = document.querySelector("#searched-city");
  let dateAndTimeDisplay = document.querySelector("#weather-update-timestamp");
  let weatherDescriptionDisplay = document.querySelector(
    "#weather-description"
  );
  let currentWeatherIconDisplay = document.querySelector(
    "#current-weather-icon"
  );
  let currentTemperatureDisplay = document.querySelector(
    "#current-temperature"
  );
  let humidityDisplay = document.querySelector("#humidity");
  let windDisplay = document.querySelector("#wind");

  searchedCityDisplay.innerHTML = searchedCityReturn;
  dateAndTimeDisplay.innerHTML = currentDateReturn;
  weatherDescriptionDisplay.innerHTML = weatherDescriptionReturn;
  currentWeatherIconDisplay.setAttribute("src", weatherIconReturn);
  currentWeatherIconDisplay.setAttribute(
    "alt",
    weatherDescriptionReturn + " icon"
  );
  currentTemperatureDisplay.innerHTML = temperatureReturn;
  humidityDisplay.innerHTML = humidityReturn;
  windDisplay.innerHTML = windReturn;
}

function searchForCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#enter-city-search");
  let apiKey = "a5b901c068d44bf01fba6c03d580de88";
  let baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=imperial`;

  axios.get(baseUrl).then(produceCityWeather);
}

let searchBar = document.querySelector("#city-search-form");
searchBar.addEventListener("submit", searchForCity);
