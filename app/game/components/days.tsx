
import styles from './days.module.css';
import { DataContext } from '@/app/utils/context';
import { use } from 'react';
import CalendarHints from '../[id]/calendar/calendarHints';

export default function Days({
  days, setDay, maxRows
}:{
  days: string[], setDay:(item:number)=>void, maxRows:number
}) {

  const data = use(DataContext);
  if (!data) return <></>;
  
  const monthStart = data[0].day_code;

  function handleClick(currentDay:number) {
    setDay(currentDay);
  }

  function populateDays() {
    if (!data) return;

    return data.map((item, index)=>{
      const dayKey = 'day' + (item.day);
      return (
        <div key={dayKey} className={styles['number']} 
          onClick={item.invalidDay ? undefined : ()=>{handleClick(index)}}
          style={index===0 ? {gridColumnStart: `${monthStart}`} : undefined}
          >
            <span className={item.invalidDay ? styles['inactive'] : undefined}>
              {item.day}
            </span>
            <CalendarHints day={index}/>
        </div>
      )
    })
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