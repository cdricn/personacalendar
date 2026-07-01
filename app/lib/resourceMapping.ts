import { GameIcons } from "./interface";
import p5confidants from '../data/p5_confidants.json'

const gregorianMonths = [
  'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December', 'January', 'February', 'March'
] as const;
const normalDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export const ResourceMapping : GameIcons = {
  ['/persona5_royal']: {
    day_modifier: {
      clear: {src: '/P5_Weather_Clear.svg', alt:'Clear weather icon'},
      cloudy: {src: '/P5_Weather_Cloudy.svg', alt:'Cloudy weather icon'},
      rainy: {src: '/P5_Weather_Rainy.svg', alt:'Rainy weather icon'},
      snowy: {src: '/P5_Weather_Snowy.svg', alt:'Snowy weather icon'},
    },
    special_day_modifier: {},
    monthHeaders: gregorianMonths,
    dayHeaders: normalDays,
    confidants: p5confidants
  }
}