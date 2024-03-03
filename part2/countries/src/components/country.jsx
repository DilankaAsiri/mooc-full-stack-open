import { useEffect, useState } from "react";

import WeatherService from "../services/weather";

const Weather = ({ lat, lng }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    WeatherService.get(lat, lng).then((data) => {
      setWeather(data);
    });
  }, [lat, lng]);

  if (!weather) return;

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      {weather.weather?.length > 0 ? (
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].icon}
        />
      ) : (
        ""
      )}
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

const Country = ({ country }) => {
  if (!country) return;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0] ?? ""}</p>
      <p>area {country.area ?? ""}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <Weather
        lat={country.capitalInfo.latlng[0]}
        lng={country.capitalInfo.latlng[1]}
      />
    </div>
  );
};

export default Country;
