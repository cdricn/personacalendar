'use client';

import styles from './calendar.module.css';
import { useEffect, useState, use } from 'react';
import { GameContext, DataContext } from '../utils/context';
import { ResourceMapping } from '../lib/resourceMapping';
import { CalendarDays } from '../lib/interface';

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
  const {dayHeaders} = ResourceMapping[game]; //remove front slash
  const {monthHeaders} = ResourceMapping[game]; //remove front slash

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

  function addSymbols(item:CalendarDays) {
    if (!item.is_day_playable) return;
    if ((item.day_activities === 'Unavailable') && (item.night_activities === 'Unavailable')) {
      return <img className={styles['hint-icon']} src='/symbol_unavailable.svg'/>;
    }
    else if ((item.day_activities === 'Limited') || (item.night_activities === 'Limited')) {
      return <img className={styles['hint-icon']} src='/symbol_yellow.svg'/>;
    }
    else if (item.activities || item.social_events) {
      return <img className={styles['hint-icon']} src='/symbol_blue.svg'/>;
    }
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
      
      <div className={styles['calendar-body-container']}>
        <div className={styles['days-header']}>
          {dayHeaders.map((i, index)=>{
            return(
              <span key={i+index}>{i}</span>
            )})
          }
        </div>

        <div className={styles['day-grid']}
          style={{
            gridTemplateColumns: `repeat(${dayHeaders.length}, 1fr)`,
            gridTemplateRows: `repeat(${maxRows}, 1fr)`
          }}>
          {data && data.map((item, index)=>{
            const dayKey = 'day' + (item.day);
            const dayStart = data[0].day_code;

            return (
              <div key={dayKey} 
                className={styles['day']} 
                onClick={item.is_day_playable ? undefined : ()=>{handleClickDay(index)}}
                style={index===0 ? {gridColumnStart: `${dayStart}`} : undefined}
                >
                  <span className={item.is_day_playable ? undefined : styles['inactive']}>
                    {item.day}
                  </span>
                  <div className={styles['hint-icons-container']}>
                    {addSymbols(item)}
                  </div>
                  {item.is_day_playable ? <div className={styles['day-hover']}></div>: undefined}
              </div>
            )})
          }
        </div>
      </div>
    </>
  )
}
