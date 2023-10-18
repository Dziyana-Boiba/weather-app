import humidityIcon from '../assets/icon_humidity.svg';
import UVindexIcon from '../assets/icon_uv-i.svg';
import visibilityIcon from '../assets/icon_eye.svg';
import pressureIcon from '../assets/icon_pressure.svg';
import cloudinessIcon from '../assets/icon_cloud-percentage.svg';
import umbrellaIcon from '../assets/icon_umbrella.svg';

import './weather.scss';

const conditions = [
  { title: 'Humidity', value: 'humidity', unit: '%', icon: humidityIcon },
  { title: 'Precipitation', value: 'precip_mm', unit: 'mm', icon: umbrellaIcon },
  { title: 'Pressure', value: 'pressure_mb', unit: 'mb', icon: pressureIcon },
  { title: 'Cloudiness', value: 'cloud', unit: '%', icon: cloudinessIcon },
  { title: 'Visibility', value: 'vis_km', unit: 'km', icon: visibilityIcon },
  { title: 'UV index', value: 'uv', unit: '', icon: UVindexIcon }
];

export const ConditionList = ({ currentData }) => {
  return (
    <div className='condition-list'>
      {conditions.map(item => (
        <div className='condition-container'>
          <img src={item.icon} alt={item.title} width='20px' height='20px' />
          <div className='condition'>
            <div className='condition-title'>{item.title}</div>
            <div className='condition-value'>
              {currentData[item.value]} <span className='unit'>{item.unit}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
