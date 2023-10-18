import { useEffect, useState } from 'react';
import { TopBar } from './components/top-bar';
import { Loading } from './global/loader/loading';
import { ErrorMessage } from './global/error/error';
import { WeatherContent } from './components/weather-content';
import { fetchForecastData } from './api/weather';
import { convertHourlyForecastData } from './utils/convert-hourly-forecast-data';

import './App.scss';

function App() {
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [city, setCity] = useState('aveiro');

  const fetchData = async city => {
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetchForecastData(city);

      const hourlyData = convertHourlyForecastData(
        response.forecast.forecastday,
        response.location.tz_id
      );
      if (typeof city === 'object') {
        setCity(city.name);
      }

      setCurrentData(response.current);
      setDailyData(response.forecast.forecastday);
      setHourlyData(hourlyData);
      setLocation(response.location);
    } catch (error) {
      setError(true);
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(city);
  }, []);

  const handleOnSearchChange = searchData => {
    const [lat, lon] = searchData.value.split(' ');
    console.log(searchData, 'search data');

    fetchData({ name: searchData.label, lat: lat, lng: lon });
  };

  return (
    <div className='weather-app-wrapper'>
      {isLoading && <Loading />}
      <div className='weather-app'>
        <TopBar onSearchChange={handleOnSearchChange} location={location} />
        {error && <ErrorMessage />}
        {currentData && !error && (
          <>
            <WeatherContent
              city={city}
              currentData={currentData}
              dailyData={dailyData}
              hourlyData={hourlyData}
              location={location}
            />
            <div className='api-link'>
              Powered by{' '}
              <a href='https://www.weatherapi.com/' title='Weather API'>
                WeatherAPI.com
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
