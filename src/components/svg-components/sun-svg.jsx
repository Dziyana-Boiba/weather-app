import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

export const SunSVG = ({ currentData, todayDate, todayAstro, location }) => {
  const arc = 'M10,90 a75,75 0 1,1 150,0';

  const currentTime = moment.tz(moment(), location.tz_id).valueOf();
  const sunrise = moment(todayDate + ' ' + todayAstro.sunrise).tz(location.tz_id, true);
  const sunset = moment(todayDate + ' ' + todayAstro.sunset).tz(location.tz_id, true);

  const sunriseTime = sunrise.valueOf();
  const sunsetTime = sunset.valueOf();

  const daylight = sunsetTime - sunriseTime;
  const currentSunTime = currentTime - sunriseTime;
  const currentSunPosition = currentSunTime / daylight;

  console.log(
    location,
    sunrise.format(),
    sunset.format(),
    moment.tz(moment(), location.tz_id).format(),
    'sunset'
  );

  const isAfterSunset = sunsetTime - currentTime > 0 ? false : true;

  const sunPosition =
    currentSunTime > 0 && !isAfterSunset
      ? `0;${currentSunPosition.toFixed(2)}`
      : currentSunTime > 0 && isAfterSunset
      ? '1; 1'
      : '0; 0';

  const sunPathDash =
    currentSunTime > 0 && !isAfterSunset
      ? `${(currentSunPosition * 100).toFixed()} ${110 - (currentSunPosition * 100).toFixed()}`
      : currentSunTime > 0 && isAfterSunset
      ? '0 110'
      : '0 110';

  const color = currentSunTime > 0 && !isAfterSunset ? 'rgb(254, 197, 45)' : 'grey';

  const [reanimate, setReanimate] = useState(false);

  useEffect(() => {
    setReanimate(prev => !prev);
  }, [currentData]);

  return (
    <svg
      key={reanimate ? 2 : 3}
      viewBox='0 0 170 90'
      width='170'
      height='90'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d={arc}
        stroke='grey'
        strokeWidth='1'
        fill='none'
        strokeLinecap='round'
        strokeDasharray='2 4'
      />
      <path
        id='path'
        d={arc}
        stroke={color}
        strokeWidth='1'
        pathLength='100'
        fill='none'
        strokeLinecap='round'
        strokeDasharray={sunPathDash}
      >
        <animate
          attributeName='stroke-dasharray'
          values={`0 110; ${sunPathDash}`}
          dur='2s'
          repeatCount='1'
        />
      </path>
      <g>
        <circle stroke={color} cx='0' cy='0' fill={color} r='4' strokeWidth='3' />
        <circle cx='8' cy='0' fill={color} r='1' />
        <circle cx='0' cy='8' fill={color} r='1' />
        <circle cx='-8' cy='0' fill={color} r='1' />
        <circle cx='0' cy='-8' fill={color} r='1' />
        <circle cx='6' cy='-6' fill={color} r='1' />
        <circle cx='6' cy='6' fill={color} r='1' />
        <circle cx='-6' cy='-6' fill={color} r='1' />
        <circle cx='-6' cy='6' fill={color} r='1' />
        <animateMotion
          keyPoints={sunPosition}
          dur='2s'
          fill='freeze'
          repeatCount='1'
          keyTimes='0;1'
          calcMode='linear'
        >
          <mpath href='#path' />
        </animateMotion>
      </g>
      <line x1='0' y1='90' x2='170' y2='90' stroke='gray' strokeWidth='1' />
    </svg>
  );
};
