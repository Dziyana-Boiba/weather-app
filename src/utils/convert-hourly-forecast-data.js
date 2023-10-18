import moment from 'moment-timezone';
import conditionJSON from './weather-condition-code-list.json';

const findClosestDate = (data, tz) => {
  //moment().tz(clientTimeZone).format();
  const currentDateTime = tz ? moment().tz(tz).format('YYYY-MM-DD HH:mm:ss') : moment();
  let closestTimeDiff = Infinity;
  let closestDate = null;
  let closestDateIndex = null;

  data.forEach((d, i) => {
    const date = moment(d, 'YYYY-MM-DD HH:mm:ss');
    const timeDiff = Math.abs(date.diff(currentDateTime), 'minutes');

    if (timeDiff < closestTimeDiff) {
      closestTimeDiff = timeDiff;
      closestDate = d;
      closestDateIndex = i;
    }
  });
  return { closestDate, closestDateIndex };
};

export const convertHourlyForecastData = (response, tz) => {
  const xArray = [];
  const yArray = [];
  const icons = [];
  const wind = [];

  let maxTemp = 0;
  let minTemp = 0;

  response.forEach(day => {
    day.hour.forEach(hour => {
      xArray.push(hour.time);
      yArray.push(hour.temp_c);

      maxTemp = Math.max(maxTemp, hour.temp_c);
      minTemp = Math.min(minTemp, hour.temp_c);

      const condition = conditionJSON.find(item => item.code === hour.condition.code);
      //const iconCode = `${hour.is_day ? 'day' : 'night'}${condition ? condition.icon : '113'}`;
      const iconCode = condition ? condition.icon : '113';
      icons.push({ code: iconCode, isDay: hour.is_day });
      wind.push({ direction: hour.wind_dir, speed: hour.wind_kph, degree: hour.wind_degree });
    });
  });

  const { closestDate, closestDateIndex } = findClosestDate(xArray, tz);

  const diff = Math.abs(minTemp - maxTemp) / 2;
  maxTemp = maxTemp + diff;
  minTemp = minTemp - diff / 2;

  return { x: xArray, y: yArray, icons, closestDate, closestDateIndex, maxTemp, minTemp, wind };
};
