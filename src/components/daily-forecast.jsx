import { WeatherIcon } from './weather-icon';

import humidityIcon from '../assets/icon_humidity.svg';
import windIcon from '../assets/icon_wind.svg';
import visibilityIcon from '../assets/icon_eye.svg';
import umbrellaIcon from '../assets/icon_umbrella.svg';
import moment from 'moment-timezone';

import './weather.scss';

const dailyConditions = {
  firstRow: [
    { title: 'Humidity', value: 'avghumidity', unit: '%', icon: humidityIcon },
    { title: 'Precipitation', value: 'totalprecip_mm', unit: 'mm', icon: umbrellaIcon }
  ],
  secondRow: [
    { title: 'Wind', value: 'maxwind_kph', unit: 'km/h', icon: windIcon },
    { title: 'Visibility', value: 'avgvis_km', unit: 'km', icon: visibilityIcon }
  ]
};

export const DailyForecast = ({ dailyData }) => {
  return (
    <div className='daily-forecast'>
      <div className='title'>Daily Forecast</div>
      <div className='day-cards-container'>
        {dailyData.map((item, i) => (
          <div className='day-card' key={item.date}>
            <div className='main-info'>
              <WeatherIcon conditionCode={item.day.condition.code} isDay={true} iconSize='small' />
              <div className='main-info-condition'>
                <div>{moment(item.date).format('dddd, MMM DD')}</div>
                <div className='condition-text'>{item.day.condition.text}</div>
              </div>
              <div className='temp'>
                <span>{Math.round(item.day.maxtemp_c)}&deg;</span>
                <span>{Math.round(item.day.mintemp_c)}&deg;</span>
              </div>
            </div>
            <div className='additional-info'>
              <div className='column'>
                {dailyConditions.firstRow.map(condition => (
                  <div className='day-condition'>
                    <img src={condition.icon} alt='humidity-icon' width='24px' height='24px' />
                    <div className='condition-wrapper'>
                      <div className='condition-title'>{condition.title}</div>
                      <div className='condition-value'>
                        {item.day[condition.value]} <span className='unit'>{condition.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='column'>
                {dailyConditions.secondRow.map(condition => (
                  <div className='day-condition'>
                    <img src={condition.icon} alt='humidity-icon' width='24px' height='24px' />
                    <div className='condition-wrapper'>
                      <div className='condition-title'>{condition.title}</div>
                      <div className='condition-value'>
                        {item.day[condition.value]} <span className='unit'>{condition.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
