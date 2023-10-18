import conditionJSON from '../utils/weather-condition-code-list.json';

export const WeatherIcon = ({ conditionCode, isDay, iconSize }) => {
  const size = { big: '100px', medium: '70px', small: '52px' };

  const condition = conditionJSON.find(item => item.code === conditionCode);
  const iconCode = condition ? condition.icon : '113';

  return (
    <img
      src={require(`../assets/weather/${isDay ? 'day' : 'night'}/${iconCode}.png`)}
      alt='weather icon'
      width={size[iconSize]}
      height={size[iconSize]}
    />
  );
};
