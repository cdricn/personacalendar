import { CalendarData, Calendar } from '../lib/interface';

export default async function getData(path:string) {
  switch(path) {
    case '/persona5_royal':
      const data = (await import('../data/p5royal.json')).default;
      let calendar_data : Calendar = {};

      for(let i=0; i<data.length-1; i++) {
        if(Object.hasOwn(calendar_data, data[i].month)) {
          calendar_data[data[i].month].push(data[i]);
        }
        else {
          calendar_data[data[i].month] = [data[i]];
        }
      }

      return calendar_data;
    default:
      return ;
  }
}