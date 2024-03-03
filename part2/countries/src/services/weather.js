import axios from "axios";

const openWeatherAPIKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const baseUrl = "https://api.openweathermap.org";

const get = (lat, lon) => {
  const request = axios.get(
    `${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKey}&units=metric`
  );
  return request.then((response) => response.data);
};

export default { get };
