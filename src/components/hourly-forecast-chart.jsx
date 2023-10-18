import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';

import chevronLeftIcon from '../assets/icon_chevron-left.svg';
import chevronRightIcon from '../assets/icon_chevron-right.svg';

import './weather.scss';

function useWindowDimensions() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export const HourlyForecastChart = ({ hourlyData }) => {
  const WindowWidth = useWindowDimensions();
  const rangeLength = WindowWidth <= 1000 && WindowWidth > 600 ? 4 : WindowWidth <= 600 ? 1 : 7;

  const xArray = hourlyData.x;
  const yArray = hourlyData.y;

  const iconsArray = hourlyData.icons.map((icon, i) => {
    return {
      source: require(`../assets/weather/${icon.isDay ? 'day' : 'night'}/${icon.code}.png`),
      xref: 'x',
      yref: 'paper',
      x: xArray[i],
      y: -0.9,
      sizex: 1,
      sizey: 1,
      xanchor: 'center',
      yanchor: 'bottom'
    };
  });

  /*   const svg = (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='20px' height='20px'>
      <polygon id='arrow' fill='#FF0000' points='2,10 18,4.5 14.8,10 18,15.5 ' />
    </svg>
  ); */

  const windIcons = hourlyData.wind.map((w, i) => {
    //const sv = new XMLSerializer().serializeToString(svg);
    const iconW =
      `data:image/svg+xml;base64, ` +
      btoa(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='50px' height='50px'><polygon transform='rotate(${w.degree} 25 25)' fill='rgb(177, 16, 16)' stroke='rgb(139, 137, 137)' stroke-width='0.5' points='25,17 30.5,33 25,29.8 19.5,33'/></svg>`
      );
    return {
      source: iconW,
      xref: 'x',
      yref: 'paper',
      x: xArray[i],
      y: -0.6,
      sizex: 1,
      sizey: 1,
      xanchor: 'center',
      yanchor: 'bottom'
    };
  });

  const windArray = hourlyData.wind.map((wind, i) => {
    return {
      text: `${wind.direction}<br>${wind.speed} km/h`,
      xref: 'x',
      yref: 'paper',
      x: xArray[i],
      y: -0.45,
      showarrow: false,
      font: {
        //family: 'Courier New, monospace',
        size: 12,
        color: 'rgb(159, 162, 167)'
      }
    };
  });

  // Define Data
  const weatherData = [
    {
      x: xArray,
      y: yArray,
      mode: 'lines+text',
      //fill: 'tozerox',
      hoverinfo: 'skip',
      type: 'scatter',
      marker: { color: 'rgb(254, 197, 45)' },
      line: { shape: 'spline' },
      text: yArray,
      texttemplate: '%{y:.0f}&deg;</br></br>',
      textposition: 'top center',
      textfont: {
        //family: 'Times',
        size: 14,
        color: '#fff'
      }
    }
  ];

  const xRangeStart = moment(hourlyData.closestDate)
    .subtract(30, 'minutes')
    .format('YYYY-MM-DD HH:mm');

  const xRangeEnd = moment(xArray[hourlyData.closestDateIndex + rangeLength])
    .add(30, 'minutes')
    .format('YYYY-MM-DD HH:mm');

  const [xaxisRange, setXaxisRange] = useState([xRangeStart, xRangeEnd]);

  useEffect(() => {
    setXaxisRange([xRangeStart, xRangeEnd]);
  }, [xRangeStart, xRangeEnd]);

  const setPreviousRange = () => {
    setXaxisRange(prev =>
      moment(prev[0]).isAfter(xArray[0])
        ? prev.map(date => {
            return moment(date).subtract(60, 'minutes').format('YYYY-MM-DD HH:mm');
          })
        : prev
    );
  };

  const setNextRange = () => {
    setXaxisRange(prev =>
      moment(xArray[xArray.length - 1]).isAfter(prev[1])
        ? prev.map(date => {
            return moment(date).add(60, 'minutes').format('YYYY-MM-DD HH:mm');
          })
        : prev
    );
  };

  const layout = {
    resposnive: true,
    autosize: true,
    height: 350,
    //width: 600,
    plot_bgcolor: 'transparent',
    paper_bgcolor: 'transparent',
    showtitle: false,
    showlegend: false,
    margin: {
      l: 20,
      r: 20,
      b: 200,
      t: 0,
      pad: 150
    },
    yaxis: {
      //autorange: true,
      range: [hourlyData.minTemp, hourlyData.maxTemp],
      //gridcolor: 'rgba(77, 77, 77, 0.3)',
      //gridwidth: 1,
      //griddash: 'dash',
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: false,
      fixedrange: true
      //maxallowed: hourlyData.diff
    },
    xaxis: {
      range: xaxisRange,
      //autorange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: true,
      fixedrange: true,
      tickfont: {
        family: 'Poppins',
        size: 14,
        color: '#F3F2F2'
      }
    },
    images: [...iconsArray, ...windIcons],
    annotations: windArray
  };

  return (
    <div className='chart-container'>
      <button onClick={() => setPreviousRange()}>
        <img src={chevronLeftIcon} alt='Chveron Right' />
      </button>
      <div className='chart'>
        <Plot
          data={weatherData}
          layout={{ ...layout }}
          config={{
            displayModeBar: false,
            scrollZoom: false,
            displaylogo: false
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <button onClick={() => setNextRange()}>
        <img src={chevronRightIcon} alt='Chveron Right' />
      </button>
    </div>
  );
};
