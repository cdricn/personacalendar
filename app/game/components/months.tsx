'use client';

import styles from './months.module.css';
import { useEffect, useState, use } from 'react';
import { GameContext } from '@/app/utils/context';
import { GameMapping } from '@/app/lib/gameMapping';

export default function Months({setMonth}:{setMonth:(item:string)=>void,}) {
  const [monthIndex, setMonthIndex] = useState(0);
  const game = use(GameContext);
  
  const {monthHeaders} = GameMapping[game.slice(1)]; //remove front slash

  useEffect(()=>{
    setMonth(monthHeaders[monthIndex]);
  }, [monthIndex])

  function handleClick(action:string) {
    if(action == 'prev' && monthIndex > 0) {
      setMonthIndex(monthIndex-1);
    }
    if(action == 'next' && monthIndex < 11) {
      setMonthIndex(monthIndex+1);
    }
  }

  return (
    <div className={styles['months-container']}>
      <div className={styles['month-nav']} onClick={()=>handleClick('prev')}>
        <span>{'<'}</span>
      </div>
      <span className={styles['month']}>
        {monthHeaders[monthIndex].slice(0, 1).toUpperCase() + monthHeaders[monthIndex].slice(1)}
      </span>
      <div className={styles['month-nav']}onClick={()=>handleClick('next')}>
        <span>{'>'}</span>
      </div>
    </div>
  )
}
