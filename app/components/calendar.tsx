'use client';

import styles from './calendar.module.css';
import { useEffect, useState, use } from 'react';
import { GameContext, DataContext } from '../utils/context';
import { ResourceMapping } from '../lib/resourceMapping';
import CalendarHints from '../(content)/persona5_royal/calendar/calendarHints';

export default function Calendar({
  setMonth,
  setDay, 
  maxRows
}:{
  setMonth:(item:string)=>void,
  setDay:(item:number)=>void, 
  maxRows:number
}) {
  
  const [monthIndex, setMonthIndex] = useState(0);
  const game = use(GameContext);
  const data = use(DataContext);
  const {dayHeaders} = ResourceMapping[game.slice(1)]; //remove front slash
  const {monthHeaders} = ResourceMapping['persona5_royal']; //remove front slash

  useEffect(()=>{
    setMonth(monthHeaders[monthIndex]);
  }, [monthIndex])

  function handleClickMonth(action:string) {
    if(action == 'prev' && monthIndex > 0) {
      setMonthIndex(monthIndex-1);
    }
    if(action == 'next' && monthIndex < 11) {
      setMonthIndex(monthIndex+1);
    }
  }
  
  function handleClickDay(currentDay:number) {
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
          onClick={item.invalidDay ? undefined : ()=>{handleClickDay(index)}}
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
    <>
      <div className={styles['months-container']}>
        <div className={styles['month-nav']} onClick={()=>handleClickMonth('prev')}>
          <span>{'<'}</span>
        </div>
        <span className={styles['month']}>
          {monthHeaders[monthIndex].slice(0, 1).toUpperCase() + monthHeaders[monthIndex].slice(1)}
        </span>
        <div className={styles['month-nav']}onClick={()=>handleClickMonth('next')}>
          <span>{'>'}</span>
        </div>
      </div>

      
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
    </>
  )
}
