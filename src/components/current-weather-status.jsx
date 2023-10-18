import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { ConditionList } from './condition-list';
import { WeatherIcon } from './weather-icon';

import calendarIcon from '../assets/icon_calendar.svg';
import clockIcon from '../assets/icon_clock.svg';

import './weather.scss';

export const CurrentWeatherStatus = ({ currentData, location }) => {
  const [currentTime, setCurrentTime] = useState(
    moment.tz(moment(), location.tz_id).format('HH:mm')
  );

  const currentDate = moment.tz(moment(), location.tz_id).format('dddd, MMM DD, YYYY');

  useEffect(() => {
    var timer = setInterval(
      () => setCurrentTime(moment.tz(moment(), location.tz_id).format('HH:mm')),
      1000 * 60
    );
    return function cleanup() {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    setCurrentTime(moment.tz(moment(), location.tz_id).format('HH:mm'));
  }, [location.tz_id]);

  return (
    <div className='current-weather-status'>
      <div className='current-date'>
        <div className='date'>
          <img src={calendarIcon} alt='calendar' width='20px' height='20px' />
          {currentDate}
        </div>
        <div className='time'>
          <img src={clockIcon} alt='calendar' width='20px' height='20px' />
          {currentTime}
        </div>
      </div>
      <div className='current-description-card'>
        <div className='current-description'>
          <WeatherIcon
            conditionCode={currentData.condition.code}
            isDay={currentData.is_day}
            iconSize='big'
          />
          <div>
            <div className='current-temp'>{Math.round(currentData.temp_c)}&deg;C</div>
            <div className='current-temp-feels'>
              Feels like {Math.round(currentData.feelslike_c)}&deg;C
            </div>
            <div className='current-condition'>{currentData.condition.text}</div>
          </div>
          <div style={{ fontSize: '10px', fontWeight: '400', color: 'rgb(180, 182, 177)' }}>
            Latest Report: {currentData.last_updated}
          </div>
        </div>
        <div className='current-condition-list'>
          <ConditionList currentData={currentData} />
        </div>
      </div>
    </div>
  );
};
