
import styles from './days.module.css';
import { GameContext, DataContext } from '@/app/utils/context';
import { use } from 'react';
import CalendarHints from '../[id]/calendar/calendarHints';
import { GameMapping } from '@/app/lib/gameMapping';

export default function Days({setDay, maxRows}:{setDay:(item:number)=>void, maxRows:number}) {
  const data = use(DataContext);
  const game = use(GameContext); 
  const {dayHeaders} = GameMapping[game.slice(1)]; //remove front slash
  
  function handleClick(currentDay:number) {
    setDay(currentDay);
  }

  function populateDays() {
    if (!data) return <>Failed to retrieve data!</>;

    return data.map((item, index)=>{
      const dayKey = 'day' + (item.day);
      const monthStart = data[0].day_code;

      return (
        <div key={dayKey} 
          className={styles['number']} 
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
        {dayHeaders.map((i, index)=>{
          return(
            <span key={i+index}>{i}</span>
          )})
        }
      </div>
      <div className={styles['numbers-grid']}
        style={{
          gridTemplateColumns: `repeat(${dayHeaders.length}, 1fr)`,
          gridTemplateRows: `repeat(${maxRows}, 1fr)`
        }}>
        {populateDays()}
      </div>
    </div>
  )
}