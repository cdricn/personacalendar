'use client';

import styles from './calendar.module.css';

export default function Months({setMonth}:{setMonth:(item:string)=>void}) {

  function handleClick(month:string) {
    setMonth(month);
  }

  const months = {
    april: 'APR',
    may: 'MAY',
    june: 'JUN',
    july: 'JUL',
    august: 'AUG',
    september: 'SEP',
    october: 'OCT',
    november: 'NOV',
    december: 'DEC',
    january: 'JAN',
    february: 'FEB',
    march: 'MAR'
  };

  return (
    <div className={styles['months-container']}>
      {Object.entries(months).map((item)=>{
        const [key, value] = item;
        return (
          <div key={key} className={styles['month']} onClick={()=>handleClick(key)}>
            <span>{value}</span>
          </div>
        );
      })}
    </div>
  )
}