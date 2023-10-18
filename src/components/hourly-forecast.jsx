import { HourlyForecastChart } from './hourly-forecast-chart';

import './weather.scss';

export const HourlyForecast = ({ hourlyData }) => {
  return (
    <div className='hourly-forecast'>
      <div className='title'>Hourly Forecast</div>
      <HourlyForecastChart hourlyData={hourlyData} />
    </div>
  );
};
