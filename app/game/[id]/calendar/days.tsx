import CalendarBlock from './calendarBlock';
import styles from './days.module.css';
import { CalendarData } from '@/app/lib/interface';
// icons used: FaExclamation, FaGlobeAsia, GiCardAceHearts ri/fa, ri/gi

export default function Days({
  days, setDay, maxRows, data
}:{
  days: string[], setDay:(item:number)=>void, maxRows:number, data: CalendarData[]
}) {
  
  const monthStart = data[0].day_code;

  function handleClick(currentDay:number) {
    setDay(currentDay);
  }

  function calendarHint(src:string, clamp:string) {
    return (
      <img className={styles['hint-icon']} src={src} 
        style={{
          width: clamp
        }}/>
    )
  }
  
  const confidantIconClamp = `clamp(15px, calc(0.9375rem + ((1vw - 2.8px) * 2.7439)), 60px)`;
  const alertIconClamp = `clamp(8px, calc(0.5rem + ((1vw - 2.8px) * 1.3415)), 30px)`;

  function populateDays() {
    let daysArray = [];
    for(let i=0; i<data.length; i++) {
      const dayKey = 'day' + (i+1);
      const {day_activities, night_activities, events, confidant_events, activities} = data[i];

      daysArray.push(
        <div key={dayKey} className={styles['number']} 
          onClick={()=>{handleClick(i)}}
          style={i==0?{gridColumnStart: `${monthStart}`}:undefined}>
            <span>{i+1}</span>
            <CalendarBlock />
            
            <div className={styles['hint-icons-container']}>
              {confidant_events===null?null: calendarHint('/confidant.png', confidantIconClamp)}
              {activities===null?null: calendarHint('/alert.png', alertIconClamp)}
              {events===null?null: calendarHint('/alert.png', alertIconClamp)}
            </div>
        </div>
      );
    }
    return daysArray;
  }

  return (
    <div className={styles['days-container']}>
      <div className={styles['days']}>
        {days.map((i, index)=>{
          return(
            <span key={i+index}>{i}</span>
          )})
        }
      </div>
      <div className={styles['numbers-grid']}
        style={{
          gridTemplateColumns: `repeat(${days.length}, 1fr)`,
          gridTemplateRows: `repeat(${maxRows}, 1fr)`
        }}>
        {populateDays()}
      </div>
    </div>
  )
}