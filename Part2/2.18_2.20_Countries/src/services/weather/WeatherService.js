import axios from "axios";

const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const api_key = import.meta.env.VITE_WEATHER_KEY;

const getWeatherCountry = (cityName, countryCode) => {
  const namec = cityName.toLowerCase();
  const codec = countryCode.toLowerCase();
  const request = axios.get(`${baseURL}${namec},${codec}&appid=${api_key}&units=metric`);
  return request.then((response) => response.data);
};

export default {getWeatherCountry}