import { OpenWeatherMap_API_KEY } from "./config.js";
const searchBox = document.getElementById("search__input");
const searchBtn = document.getElementById("search__btn");
const weatherTemp = document.getElementById("weather__temp");
const weatherCity = document.getElementById("weather__city");
const weatherHumidity = document.getElementById("weather__humidity");
const weatherWind = document.getElementById("weather__wind");

// 콜백형식
// function onGeoSuccess(position) {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;
//   console.log(lat, lon);
// }
// function onGeoError() {
//   alert("Can't find location.");
// }
// navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);

// Promise로 감싼것
async function getLocationAuto() {
  function getCurrentPositionPromise() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  try {
    const position = await getCurrentPositionPromise();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    return [lat, lon];
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

async function getLocationByCity(city) {
  const geo_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${OpenWeatherMap_API_KEY}`;
  console.log(geo_url);
  try {
    const geo_res = await fetch(geo_url);
    let geo_data = await geo_res.json();
    return [geo_data[0].lat, geo_data[0].lon]; //lat, lon
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

async function getReverseLocation(coords) {
  const reverse_geo_url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[0]}&lon=${coords[1]}&limit=1&appid=${OpenWeatherMap_API_KEY}`;
  try {
    const geo_res = await fetch(reverse_geo_url);
    let geo_data = await geo_res.json();
    console.log("reverse geo data:", geo_data);
    return geo_data[0].name;
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

async function getWeatherJson(lat, lon) {
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OpenWeatherMap_API_KEY}`;
  console.log(weather_url);
  try {
    const weather_res = await fetch(weather_url);
    let weather_data = await weather_res.json();
    console.log("json data:", weather_data);
    return weather_data;
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

async function getWeather(searchedCity = "") {
  console.log("city input:", searchedCity);
  let coords;
  // 도시 검색하지 않았을때
  if (searchedCity === "") {
    coords = await getLocationAuto();
    console.log("getLocationAuto:", coords[0], coords[1]);
  }
  // 도시 검색했을때
  else {
    coords = await getLocationByCity(searchedCity);
    console.log("getLocationByCity:", coords[0], coords[1]);
  }
  const jsondata = await getWeatherJson(coords[0], coords[1]);
  const cityName = await getReverseLocation(coords);
  const temp = Math.floor(jsondata.main.temp - 273.15);
  const regionName = jsondata.name;
  const humidity = jsondata.main.humidity;
  const wind = (jsondata.wind.speed * 3.6).toFixed(2);
  console.log(
    `temp: ${temp}, city name: ${cityName}, region name: ${regionName}, humidity: ${humidity}, windspeed: ${wind}`
  );
  // 데이터 렌더링
  weatherTemp.innerText = `${temp}°C`;
  weatherCity.innerText = cityName;
  weatherHumidity.innerText = `${humidity}%`;
  weatherWind.innerText = `${wind} km/h`;
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
  searchBox.value = "";
});
searchBox.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    getWeather(searchBox.value);
    searchBox.value = "";
  }
});

getWeather();
