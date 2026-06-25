import { GameIcons } from "./interface";
import p5confidants from '../data/p5_confidants.json'

const gregorianMonths = [
  'april', 'may', 'june', 'july', 'august', 'september',
  'october', 'november', 'december', 'january', 'february', 'march'
] as const;
const normalDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const ResourceMapping : GameIcons = {
  ['/persona5_royal']: {
    day_modifier: {
      clear: {src: '/P5_Weather_Clear.webp', alt:'Clear weather icon'},
      cloudy: {src: '/P5_Weather_Cloudy.webp', alt:'Cloudy weather icon'},
      rainy: {src: '/P5_Weather_Rainy.webp', alt:'Rainy weather icon'},
      snowy: {src: '/P5_Weather_Snowy.webp', alt:'Snowy weather icon'},
    },
    special_day_modifier: {},
    monthHeaders: gregorianMonths,
    dayHeaders: normalDays,
    confidants: p5confidants
  }
}