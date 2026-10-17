import { Resource } from "./interface";

const months = [
  'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December', 'January', 'February', 'March'
] as const;
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export const ResourceMapping : Resource = {
  ['/persona5_royal']: {
    title: 'Persona 5 Royal',
    weather_icons: {
      clear: {src: '/P5_Weather_Clear.svg', alt:'Clear weather icon'},
      cloudy: {src: '/P5_Weather_Cloudy.svg', alt:'Cloudy weather icon'},
      rainy: {src: '/P5_Weather_Rainy.svg', alt:'Rainy weather icon'},
      snowy: {src: '/P5_Weather_Snowy.svg', alt:'Snowy weather icon'},
    },
    dataSrc: {
      calendarData: 'p5royal_data.json',
      socialsData: 'p5royal_confidants.json',
      jobsData: 'p5royal_confidants.json',
    },
    special_day_modifier: {},
    monthHeaders: months,
    dayHeaders: days,
    general_icons: {
      unavailable: {src: '/P5_Icon_Unavailable.svg', alt: 'Unavailable'},
      limited: {src: '/P5_Icon_Limited.svg', alt: 'Limited'}
    }
  }
}


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