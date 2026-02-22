'use client';

import styles from './calendar.module.css';
import { useEffect, useState } from 'react';

export default function Months({setMonth}:{setMonth:(item:string)=>void,}) {
  const [monthIndex, setMonthIndex] = useState(0);
  const months = [
    'april', 'may', 'june', 'july', 'august', 'september',
    'october', 'november', 'december', 'january', 'february', 'march'
  ]

  useEffect(()=>{
    setMonth(months[monthIndex]);
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
      <div className={styles['month-nav']}
        onClick={()=>handleClick('prev')}>
          {'<'}
      </div>
      <span className={styles['month']}>
        {months[monthIndex].slice(0, 1).toUpperCase() + months[monthIndex].slice(1)} 20XX
      </span>
      <div className={styles['month-nav']}
        onClick={()=>handleClick('next')}>
          {'>'}
      </div>
    </div>
  )
}
