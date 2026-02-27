
import styles from './days.module.css';
import { DataContext } from '@/app/utils/context';
import { use } from 'react';
import CalendarBlock from './calendarBlock';

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
    let daysArray = [];
    
    if (!data) return;

    for(let i=0; i<data.length; i++) {
      const dayKey = 'day' + (i+1);

      daysArray.push(
        <div key={dayKey} className={styles['number']} 
          onClick={data[i].invalidDay ? undefined : ()=>{handleClick(i)}}
          style={i==0 ? {gridColumnStart: `${monthStart}`} : undefined}
          >
            <span className={data[i].invalidDay ? styles['inactive'] : undefined}>
              {i+1}
            </span>
            <CalendarBlock day={i}/>
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