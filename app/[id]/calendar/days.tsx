import styles from './days.module.css';
import { CalendarData } from '@/app/lib/interface';

export default function Days({
  data,
  setDay
}:{
  data: CalendarData[],
  setDay:(item:number)=>void
}) {

  function handleClick(currentDay:number) {
    setDay(currentDay);
  }

  const monthStart = data[0].day_code;

  function populateDays() {
    let daysArray = [];
    for(let i=0; i<data.length; i++) {
      const dayKey = 'day' + (i+1);
      if(data[i].day_activities !== null && data[i].night_activities !== null) {
        daysArray.push(
          <div key={dayKey} className={styles['number']} 
            onClick={()=>{handleClick(i)}}
            style={i==0?{gridColumnStart: `${monthStart}`}:undefined}>
            <span>{i+1}</span>
          </div>
        );
      } else {
        daysArray.push(
          <div key={dayKey} className={[styles['number'], styles['inactive']].join(' ')} 
            style={i==0?{gridColumnStart: `${monthStart}`}:undefined}>
            <span>{i+1}</span>
          </div>
        );
      }
    }
    return daysArray;
  }

  return (
    <div className={styles['days-container']}>
      <div className={styles['days']}>
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>
      <div className={styles['numbers-grid']}>
        {populateDays()}
      </div>
    </div>
  )
}