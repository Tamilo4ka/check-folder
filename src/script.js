let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let today = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

let date = document.querySelector("#date");
date.innerHTML = `${day} ${today}`;

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric&&appid=9f0294a92b6eb81ed3250921cf34f28c`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${temperature}℃`;
  let wind = document.querySelector("#weather-wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#weather-humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9f0294a92b6eb81ed3250921cf34f28c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Kharkiv");
