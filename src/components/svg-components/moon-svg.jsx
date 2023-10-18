import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

export const MoonSVG = ({ currentData, todayDate, todayAstro, tomorrowAstro, location }) => {
  const arc = 'M10,90 a75,75 0 1,1 150,0';

  const currentTime = moment.tz(moment(), location.tz_id).valueOf();
  const moonrise = moment(todayDate + ' ' + todayAstro.moonrise).tz(location.tz_id, true);

  const moonset = moment(todayDate + ' ' + todayAstro.moonset).tz(location.tz_id, true);

  const moonriseTime = moonrise.valueOf();
  const moonsetTime = moment(moonset).isBefore(moonrise)
    ? moment(todayDate + ' ' + tomorrowAstro.moonset)
        .tz(location.tz_id, true)
        .add(1, 'd')
        .valueOf()
    : moonset.valueOf();

  const moonlight = moonsetTime - moonriseTime;
  const currentMoonTime = currentTime - moonriseTime;
  const currentMoonPosition = currentMoonTime / moonlight;

  const isAfterMoonset = moonsetTime - currentTime > 0 ? false : true;

  const moonPosition =
    currentMoonTime > 0 && !isAfterMoonset
      ? `0;${currentMoonPosition.toFixed(2)}`
      : currentMoonTime > 0 && isAfterMoonset
      ? '1; 1'
      : '0; 0';

  const moonPathDash =
    currentMoonTime > 0 && !isAfterMoonset
      ? `${(currentMoonPosition * 100).toFixed()} ${110 - (currentMoonPosition * 100).toFixed()}`
      : currentMoonTime > 0 && isAfterMoonset
      ? '0 110'
      : '0 110';

  let color = currentMoonTime > 0 && !isAfterMoonset ? '#DCDCDC' : 'grey';

  const [reanimate, setReanimate] = useState(false);

  useEffect(() => {
    setReanimate(prev => !prev);
  }, [currentData]);

  return (
    <svg
      key={reanimate ? 4 : 5}
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
        strokeDasharray={moonPathDash}
      >
        <animate
          attributeName='stroke-dasharray'
          values={`0 110; ${moonPathDash}`}
          dur='2s'
          repeatCount='1'
        />
      </path>
      <g>
        <path
          d='M-0.7-9.7c0,0-0.1,0-0.1,0C-5.7-8.7-9-3.7-8.2,1.6c0.7,4.5,4.3,7.9,8.6,8.1c0.1,0,0.2,0,0.3,0c2.9,0,5.7-1.5,7.4-4.1
	c0.2-0.3,0.1-0.8-0.2-1C7.9,4.4,7.8,4.4,7.6,4.4C2.7,3.9-1-0.8-0.6-6.2C-0.5-7-0.3-7.9-0.1-8.7c0.1-0.4,0-0.8-0.4-1
	C-0.5-9.7-0.6-9.7-0.7-9.7z'
          fill={color}
        />
        <animateMotion
          dur='2s'
          keyPoints={moonPosition}
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
