export const baseUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const fetchCities = async search => {
  const url = `${baseUrl}/cities?types=CITY&namePrefix=${search}&limit=10&sort=-population%2C%20name`;
  const response = await (
    await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_GEO_API_KEY}`,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    })
  ).json();

  return {
    options: response.data.map(city => {
      return {
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.region}, ${city.countryCode}`
      };
    })
  };
};
