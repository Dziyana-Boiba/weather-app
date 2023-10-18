import { useEffect, useState } from 'react';

export const WindSVG = ({ data, city }) => {
  const windCirclePoint = (data.wind_degree / 360 + 0.25).toFixed(2);

  const animationTimes =
    windCirclePoint > 1
      ? `0; ${(2 - windCirclePoint).toFixed(2)}; ${(2 - windCirclePoint).toFixed(2)}; 1`
      : '0;1';

  const animationPoints =
    windCirclePoint > 1
      ? `0.25; 1; 0; ${(windCirclePoint - 1).toFixed(2)}`
      : `0.25; ${windCirclePoint}`;

  const [reanimate, setReanimate] = useState(false);

  useEffect(() => {
    setReanimate(prev => !prev);
  }, [data, city]);

  return (
    <svg
      key={reanimate ? 0 : 1}
      width='162'
      height='160'
      viewBox='0 0 162 160'
      xmlns='http://www.w3.org/2000/svg'
    >
      <text
        x='85'
        y='10'
        fontSize='14'
        fontWeight='700'
        fill='rgb(170, 167, 167)'
        textAnchor='middle'
      >
        N
      </text>

      <text
        x='155'
        y='85'
        fontSsize='14'
        fontWeight='700'
        fill='rgb(170, 167, 167)'
        textAnchor='start'
      >
        E
      </text>

      <text
        x='85'
        y='160'
        fontSsize='14'
        fontWeight='700'
        fill='rgb(170, 167, 167)'
        textAnchor='middle'
      >
        S
      </text>
      <text
        x='15'
        y='85'
        fontSsize='14'
        fontWeight='700'
        fill='rgb(170, 167, 167)'
        textAnchor='end'
      >
        W
      </text>

      <path
        d='M25,80 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0'
        id='circle'
        fill='none'
        stroke='grey'
        strokeWidth='2'
      />
      <polygon
        //fill='rgb(146, 8, 8)'
        fill='rgb(177, 16, 16)'
        stroke='rgb(139, 137, 137)'
        stroke-width='0.5'
        points='0,-8 5.5,8 0,4.8 -5.5,8 '
      >
        {' '}
        <animateMotion
          keyPoints={animationPoints}
          keyTimes={animationTimes}
          dur='2s'
          fill='freeze'
          repeatCount='1'
          calcMode='linear'
          rotate='auto'
        >
          <mpath href='#circle' />
        </animateMotion>
      </polygon>
      <text
        x='85'
        y='60'
        fontSize='16'
        fontWeight='600'
        fill='rgb(217, 206, 206)'
        textAnchor='middle'
      >
        {data.wind_dir}
        <animate attributeName='opacity' from='0' to='1' dur='3s' />
      </text>
      <text
        x='85'
        y='87'
        fontSize='18'
        fontWeight='600'
        fill='#fff'
        textAnchor='middle'
        opacity='1'
      >
        {data.wind_kph} km/h
        <animate attributeName='opacity' from='0' to='1' dur='3s' />
      </text>
      <text
        x='85'
        y='115'
        fontSize='14'
        fontWeight='600'
        fill='rgb(139, 137, 137)'
        textAnchor='middle'
      >
        {data.wind_degree}&deg;
        <animate attributeName='opacity' from='0' to='1' dur='3s' />
      </text>
    </svg>
  );
};
