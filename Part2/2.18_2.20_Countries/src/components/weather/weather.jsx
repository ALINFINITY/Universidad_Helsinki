import { useEffect, useState } from "react";
import WeatherService from "../../services/weather/WeatherService";

export const Weather = ({ cityName, countryCode, notification }) => {
  const [weather, setWeather] = useState({});

  const getData = () => {
    WeatherService.getWeatherCountry(cityName, countryCode)
      .then((data) => {
        console.log(data);
        setWeather(data);
      })
      .catch((error) => {
        notification(
          `An error occurred while getting weather data: ${error.message}`,
          "error",10000
        );
      });
  };

  useEffect(() => {
    getData();
  }, [cityName]);

  if (weather) {
    return (
      <div className="card-weather">
        <h3>Weather in {weather?.name}</h3>
        <h4>{weather?.weather?.[0]?.description || "Loading..."}</h4>
        <img
          src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
          alt={weather?.weather?.[0]?.description}
        />
        <p>Temperature: {weather?.main?.temp || "Loading..."} °C</p>
        <p>Speed Wind: {weather?.wind?.speed || "Loading..."} m/s</p>
        <p>Humidity: {weather?.main?.humidity || "Loading..."} %</p>
        <p>Pressure: {weather?.main?.pressure || "Loading..."} kPa</p>
      </div>
    );
  } else {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
};
