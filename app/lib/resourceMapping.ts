import { GameIcons } from "./interface";
import p5royal_confidants from '../data/p5royal_confidants.json'

const months = [
  'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December', 'January', 'February', 'March'
] as const;
export const monthsToDigits : {[month:string]: string} = {
  january: '1',
  february: '2',
  march: '3',
  april: '4',
  may: '5',
  june: '6',
  july: '7',
  august: '8',
  september: '9',
  october: '10',
  november: '11',
  december: '12',
};
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export const ResourceMapping : GameIcons = {
  ['/persona5_royal']: {
    day_modifier: {
      clear: {src: '/P5_Weather_Clear.svg', alt:'Clear weather icon'},
      cloudy: {src: '/P5_Weather_Cloudy.svg', alt:'Cloudy weather icon'},
      rainy: {src: '/P5_Weather_Rainy.svg', alt:'Rainy weather icon'},
      snowy: {src: '/P5_Weather_Snowy.svg', alt:'Snowy weather icon'},
    },
    special_day_modifier: {},
    monthHeaders: months,
    dayHeaders: days,
    confidants: p5royal_confidants
  },
  // PLACEHOLDERS
  // CHANGE TO RESPECTIVE GAMES LATER
  ['/persona4_golden']: {
    day_modifier: {
      clear: {src: '/P5_Weather_Clear.svg', alt:'Clear weather icon'},
      cloudy: {src: '/P5_Weather_Cloudy.svg', alt:'Cloudy weather icon'},
      rainy: {src: '/P5_Weather_Rainy.svg', alt:'Rainy weather icon'},
      snowy: {src: '/P5_Weather_Snowy.svg', alt:'Snowy weather icon'},
    },
    special_day_modifier: {},
    monthHeaders: months,
    dayHeaders: days,
    confidants: p5royal_confidants
  },
  ['/persona3_reload']: {
    day_modifier: {
      clear: {src: '/P5_Weather_Clear.svg', alt:'Clear weather icon'},
      cloudy: {src: '/P5_Weather_Cloudy.svg', alt:'Cloudy weather icon'},
      rainy: {src: '/P5_Weather_Rainy.svg', alt:'Rainy weather icon'},
      snowy: {src: '/P5_Weather_Snowy.svg', alt:'Snowy weather icon'},
    },
    special_day_modifier: {},
    monthHeaders: months,
    dayHeaders: days,
    confidants: p5royal_confidants
  }
}