import { CurrentWeatherStatus } from './current-weather-status';
import { CurrentWeatherInfo } from './current-weather-info';
import { DailyForecast } from './daily-forecast';
import { HourlyForecast } from './hourly-forecast';

import './weather.scss';

export const WeatherContent = ({ city, currentData, dailyData, hourlyData, location }) => {
  return (
    <div className='weather-content'>
      <div className='row'>
        <div className='column left'>
          <CurrentWeatherStatus currentData={currentData} location={location} />
        </div>
        <div className='column right'>
          <CurrentWeatherInfo
            city={city}
            currentData={currentData}
            todayDate={dailyData[0].date}
            todayAstro={dailyData[0].astro}
            tomorrowAstro={dailyData[1].astro}
            location={location}
          />
        </div>
      </div>
      <div className='row'>
        <div className='column left'>
          <DailyForecast dailyData={dailyData} />
        </div>
        <div className='column right'>
          <HourlyForecast hourlyData={hourlyData} />
        </div>
      </div>
    </div>
  );
};
