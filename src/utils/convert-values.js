export const daysPt = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
export const daysEn = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const monthList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export function kelvinToCelcius(num) {
  return Math.round(num - 273.15);
}

export function getWindDirection(angle) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(angle / 45) % 8];
}

export const moonPhase = {
  'New Moon': 'newMoon',
  'Waxing Crescent': 'waxingCrescent',
  'First Quarter': 'firstQuarter',
  'Waxing Gibbous': 'waxingGibbous',
  'Full Moon': 'fullMoon',
  'Waning Gibbous': 'waningGibbous',
  'Last Quarter': 'lastQuarter',
  'Waning Crescent': 'waningCrescent'
};

/* export function celciusToFahrenheit(c: number) {
  return Math.round(c * (9 / 5) + 32);
}

export function fahrenheitToCelcius(f: number) {
  return Math.round(((f - 32) * 5) / 9);
}

export function kmToMile(n: number) {
  return Math.round(n / 1.60934);
}

export function mileToKm(n: number) {
  return Math.round(n * 1.60934);
} */
