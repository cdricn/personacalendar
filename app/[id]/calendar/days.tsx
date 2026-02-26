import styles from './days.module.css';
import { CalendarData } from '@/app/lib/interface';
import { GiCardAceHearts } from "react-icons/gi";
import { FaExclamation, FaGlobeAsia } from "react-icons/fa";

export default function Days({data, setDay}:{data: CalendarData[], setDay:(item:number)=>void}) {
  function handleClick(currentDay:number) {
    setDay(currentDay);
  }
  
  const monthStart = data[0].day_code;

  function calendarHint(src:string, clamp:string) {
    return (
      <img className={styles['hint-icon']} src={src} 
        style={{
          width: clamp
        }}/>
    )
  }

  const activityIconClamp = `clamp(12px, calc(0.75rem + ((1vw - 2.8px) * 2.3171)), 50px)`;
  const confidantIconClamp = `clamp(15px, calc(0.9375rem + ((1vw - 2.8px) * 2.7439)), 60px)`;
  const alertIconClamp = `clamp(8px, calc(0.5rem + ((1vw - 2.8px) * 1.3415)), 30px)`;

  function populateDays() {
    let daysArray = [];
    for(let i=0; i<data.length; i++) {
      const dayKey = 'day' + (i+1);
      const {day_activities, night_activities, events, confidant_events, activities} = data[i];

      // icoins used: FaExclamation, FaGlobeAsia, GiCardAceHearts ri/fa, ri/gi
      if(day_activities !== null && night_activities !== null) {
        daysArray.push(
          <div key={dayKey} className={styles['number']} 
            onClick={()=>{handleClick(i)}}
            style={i==0?{gridColumnStart: `${monthStart}`}:undefined}>
              <span>{i+1}</span>
              <div className={styles['hint-icons-container']}>
                {activities===null?null: calendarHint('./activity.png', activityIconClamp)}
                {confidant_events===null?null: calendarHint('./confidant.png', confidantIconClamp)}
                {events===null?null: calendarHint('./alert.png', alertIconClamp)}
              </div>
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