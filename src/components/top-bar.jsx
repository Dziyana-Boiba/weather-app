import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { fetchCities } from '../api/city';

import locationIcon from '../assets/icon_location_pin.svg';
import searchIcon from '../assets/icon_search.svg';

import './top-bar.scss';

export const TopBar = ({ onSearchChange, location }) => {
  const [searchInput, setSearchInput] = useState('');

  const onSearchInputChanged = data => {
    setSearchInput(data);
    onSearchChange(data);
  };

  const customStyles = {
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused
        ? '1px solid rgba(116, 111, 111, 0.3)'
        : '1px solid rgba(116, 111, 111, 0.3)',
      '&:hover': {
        borderColor: ''
      },
      borderRadius: '15px',
      padding: '5px 20px 5px 44px',
      color: '#fff',
      boxShadow: state.isFocused
        ? '0 4px 30px rgba(0, 0, 0, 0.1)'
        : '0 4px 30px rgba(0, 0, 0, 0.1)',
      background: 'rgba(196, 196, 196, 0.1)',
      backdropFilter: ' blur(10px)'
    }),
    dropdownIndicator: base => ({
      ...base,
      color: '#fff',
      paddingRight: '0px',
      '&:hover': { color: '#fff' }
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgb(180, 182, 177)'
    }),
    option: (provided, state) => ({
      ...provided,
      width: '100%',
      backgroundColor: state.isFocused ? 'rgba(247, 243, 243, 0.2)' : 'transparent',
      color: state.isFocused ? 'white' : '#fff',
      fontFamily: 'Open Sans'
    }),
    menuList: (provided, state) => ({
      ...provided,
      '::-webkit-scrollbar': {
        width: '10px',
        height: '0px'
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent'
      },
      '::-webkit-scrollbar-thumb': {
        background: '#bdb8b8',
        borderRadius: '5px',
        border: '1px solid rgba(116, 111, 111, 0.3)'
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#bdb8b8a6'
      }
    }),
    menu: (provided, state) => ({
      ...provided,
      //padding: '5px 0px 5px 0px',
      borderRadius: '10px',
      border: '1px solid rgba(116, 111, 111, 0.3)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      background: 'rgba(253, 251, 251, 0.1)',
      backdropFilter: ' blur(15px)'
    }),
    singleValue: (provided, state) => ({ ...provided, color: '#fff' }),
    input: (provided, state) => ({ ...provided, color: '#fff' }),
    placeholder: (provided, state) => ({ ...provided, color: '#fff' })
  };
  return (
    <div className='top-bar'>
      <div className='top-bar-left'>
        <div className='location'>
          <img src={locationIcon} alt='location pin' />
          {location ? `${location.name}, ${location.country}` : ''}
        </div>
        <div className='dark-light-mode-left'>dark/light mode</div>
      </div>

      <div className='search-bar-wrapper'>
        <div className='search-bar'>
          <img src={searchIcon} alt='Search city' />
          <AsyncPaginate
            placeholder='Search city'
            debounceTimeout={800}
            defaultValue={''}
            value={searchInput}
            onChange={onSearchInputChanged}
            loadOptions={fetchCities}
            styles={customStyles}
            menuPortalTarget={document.body}
            classNamePrefix='filter'
          />
        </div>
      </div>

      <div className='dark-light-mode'>dark/light mode</div>
    </div>
  );
};
