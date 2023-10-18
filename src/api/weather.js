const baseWeatherApiUrl = 'http://api.weatherapi.com/v1';

export const fetchForecastData = async city => {
  let url = `${baseWeatherApiUrl}/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;

  if (typeof city === 'object') {
    url = `${baseWeatherApiUrl}/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city.lat},${city.lng}&days=3&aqi=no&alerts=no`;
  }
  return await (await fetch(url)).json();
};
