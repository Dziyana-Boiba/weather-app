import moment from 'moment-timezone';
import { WindSVG } from './svg-components/wind-svg';
import { SunSVG } from './svg-components/sun-svg';
import { MoonSVG } from './svg-components/moon-svg';
import { ConditionList } from './condition-list';

import windIcon from '../assets/icon_wind.svg';
import sunriseIcon from '../assets/icon_sunrise.svg';
import sunsetIcon from '../assets/icon_sunset.svg';
import sunlightIcon from '../assets/icon_sunlight.svg';
import moon8 from '../assets/icon_moonrise.svg';
import moonsetIcon from '../assets/icon_moonset.svg';

import firstQuarter from '../assets/moon/First_Quarter.svg';
import fullMoon from '../assets/moon/Full_Moon.svg';
import lastQuarter from '../assets/moon/Last_Quarter.svg';
import newMoon from '../assets/moon/New_Moon.svg';
import waningCrescent from '../assets/moon/Waning_Crescent.svg';
import waningGibbous from '../assets/moon/Waning_Gibbous.svg';
import waxingGibbous from '../assets/moon/Waxing_Gibbous.svg';
import waxingCrescent from '../assets/moon/Waxing_Crescent.svg';

const moonPhase = {
  'New Moon': newMoon,
  'Waxing Crescent': waxingCrescent,
  'First Quarter': firstQuarter,
  'Waxing Gibbous': waxingGibbous,
  'Full Moon': fullMoon,
  'Waning Gibbous': waningGibbous,
  'Last Quarter': lastQuarter,
  'Waning Crescent': waningCrescent
};

export const CurrentWeatherInfo = ({
  currentData,
  todayDate,
  todayAstro,
  tomorrowAstro,
  city,
  location
}) => {
  const sunrise = moment(todayDate + ' ' + todayAstro.sunrise);
  const sunset = moment(todayDate + ' ' + todayAstro.sunset);
  const diff = moment.duration(sunset.diff(sunrise));

  const daylightH = diff.hours();
  const daylightM = diff.minutes();

  const sunriseTime = moment(todayDate + ' ' + todayAstro.sunrise).format('HH:mm');
  const sunsetTime = moment(todayDate + ' ' + todayAstro.sunset).format('HH:mm');
  const moonriseTime = moment(todayDate + ' ' + todayAstro.moonrise).format('HH:mm');
  const moonsetTime = moment(todayDate + ' ' + todayAstro.moonset).isBefore(
    todayDate + ' ' + todayAstro.moonrise
  )
    ? moment(todayDate + ' ' + tomorrowAstro.moonset).format('HH:mm')
    : moment(todayDate + ' ' + todayAstro.moonset).format('HH:mm');

  return (
    <div className='current-weather-info'>
      <div className='title'>Current condition</div>
      <div className='cards-container'>
        <div className='card'>
          <ConditionList currentData={currentData} />
        </div>
        <div className='card'>
          <div className='card-title'>Wind Status</div>
          <WindSVG data={currentData} city={city} />
          <div className='condition'>
            <img src={windIcon} alt='wind-direction-icon' width='20px' height='20px' />
            <div className='condition-title'>Gust</div>
            <div className='condition-value'>
              {currentData.gust_kph} <span className='unit'>km/h</span>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-title'>Sunrise & Sunset</div>
          <SunSVG
            currentData={currentData}
            city={city}
            todayDate={todayDate}
            todayAstro={todayAstro}
            location={location}
          />
          <div className='sun-info'>
            <div className='sunrise'>
              <img src={sunriseIcon} alt='sunrise' width='20px' height='20px' />
              <span className='name'>Sunrise</span>
              <span className='time'>{sunriseTime}</span>
            </div>
            <div className='sunset'>
              <img src={sunsetIcon} alt='sunset' width='20px' height='20px' />
              <span className='name'>Sunset</span>
              <span className='time'>{sunsetTime}</span>
            </div>
          </div>
          <div className='condition'>
            <img src={sunlightIcon} alt='Sunlight' width='20px' height='20px' />
            <div className='condition-title'>Daylight</div>
            <div className='condition-value'>
              {daylightH}
              <span className='unit'>h</span> {daylightM}
              <span className='unit'>m</span>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-title'>Moonrise & Moonset</div>
          <MoonSVG
            currentData={currentData}
            city={city}
            todayDate={todayDate}
            todayAstro={todayAstro}
            tomorrowAstro={tomorrowAstro}
            location={location}
          />
          <div className='moon-info'>
            <div className='moonrise'>
              <img src={moon8} alt='moonrise' width='20px' height='20px' />
              <span className='name'>Moonrise</span>
              <span className='time'>{moonriseTime}</span>
            </div>
            <div className='moonset'>
              <img src={moonsetIcon} alt='moonset' width='20px' height='20px' />
              <span className='name'>Moonset</span>
              <span className='time'>{moonsetTime}</span>
            </div>
          </div>
          <div className='moon-phase'>
            <img
              src={moonPhase[todayAstro.moon_phase]}
              alt='Moon Phase'
              width='20px'
              height='20px'
            />
            <div>{todayAstro.moon_phase}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
