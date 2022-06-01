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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#six-day-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML += `                
    <div class="col-2">
    <div class="forecast-day">${formatForecastDay(forecastDay.dt)}</div>
    <img
        src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="52px"
    />
    <div class="forecast-temperatures">
    <span class="forecast-hi-temperature">${Math.round(
      forecastDay.temp.max
    )}&deg;</span>
    <span class="forecast-lo-temperature">${Math.round(
      forecastDay.temp.min
    )}&deg;</span>
    </div>
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function handleCoordinates(coordinates) {
  let apiKey = "a5b901c068d44bf01fba6c03d580de88";
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(forecastApi).then(displayForecast);
}

function produceCityWeather(response) {
  let searchedCityReturn = `${response.data.name}, ${response.data.sys.country}`;
  let currentDateReturn = formatDate();
  let weatherDescriptionReturn = response.data.weather[0].description;
  let weatherIconCode = response.data.weather[0].icon;
  let weatherIconReturn = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  let temperatureReturn = Math.round(response.data.main.temp);
  let humidityReturn = response.data.main.humidity;
  let windReturn = response.data.wind.speed;

  fahrenheitTemperature = Math.round(response.data.main.temp);

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
    `${weatherDescriptionReturn} icon`
  );
  currentTemperatureDisplay.innerHTML = temperatureReturn;
  humidityDisplay.innerHTML = humidityReturn;
  windDisplay.innerHTML = windReturn;

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  handleCoordinates(response.data.coord);
}

function fahrenheitToCelsiusConversion(event) {
  event.preventDefault();
  let currentTemperatureDisplay = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureDisplay.innerHTML = Math.round(
    (fahrenheitTemperature - 32) * (5 / 9)
  );
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperatureDisplay = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureDisplay.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#enter-city-search");
  searchForCity(cityInputElement.value);
}

function searchForCity(city) {
  let apiKey = "a5b901c068d44bf01fba6c03d580de88";
  let baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(baseUrl).then(produceCityWeather);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", fahrenheitToCelsiusConversion);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let fahrenheitTemperature = null;

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", handleSubmit);

searchForCity("New York");
