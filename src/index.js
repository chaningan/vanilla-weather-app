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
console.log("day", day);

let time = now.getHours();
console.log("time", time);

let minutes = now.getMinutes();
console.log("mins", minutes);

let dateTime = document.querySelector("#displayDate");
dateTime.innerHTML = `${day} ${time}:${minutes}`;
console.log("datetime", dateTime);

function displayLocation(response) {
  console.log("response:", response.data);
  document.querySelector("#location").innerHTML = response.data.name;
  //copies what is typed in the input and displays it in h1
  let temp = Math.round(response.data.main.temp);
  console.log("temp", temp);
  let cityTemp = document.querySelector(".temps");
  cityTemp.innerHTML = `${temp}°C`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  // let humidity = document.querySelector("#humid");
  // humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  document.querySelector(
    "#humid"
  ).innerHTML = `Humidity: ${response.data.main.humidity}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
}

//2. searches for the weather of a specific city
function searchCity(city) {
  let key = "49c0a79d5c55e2e846215d64443bcc56";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayLocation);
}

function searchLocation(position) {
  //position.coords.latitude
  //position.coords.longitude;
  let key = "49c0a79d5c55e2e846215d64443bcc56";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(url).then(displayLocation);
  console.log("urrl", url);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  //1. calls the function above (search(city)) which is whatever we type in the input
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//3. searches for this specific city and displays this weather info
//displays on the page as a default upon each reload
searchCity("San Diego");
