'use client';

import styles from './calendar.module.css';

export default function Months({setMonth}:{setMonth:(item:string)=>void}) {

  function handleClick(month:string) {
    setMonth(month);
  }

  return (
    <div className={styles['months-container']}>
      <div className={styles['month']} onClick={()=>handleClick('april')}><span>APR</span></div>
      <div className={styles['month']} onClick={()=>handleClick('may')}><span>MAY</span></div>
      <div className={styles['month']} onClick={()=>handleClick('june')}><span>JUN</span></div>
      <div className={styles['month']} onClick={()=>handleClick('july')}><span>JUL</span></div>
      <div className={styles['month']} onClick={()=>handleClick('august')}><span>AUG</span></div>
      <div className={styles['month']} onClick={()=>handleClick('september')}><span>SEP</span></div>
      <div className={styles['month']} onClick={()=>handleClick('october')}><span>OCT</span></div>
      <div className={styles['month']} onClick={()=>handleClick('november')}><span>NOV</span></div>
      <div className={styles['month']} onClick={()=>handleClick('december')}><span>DEC</span></div>
      <div className={styles['month']} onClick={()=>handleClick('january')}><span>JAN</span></div>
      <div className={styles['month']} onClick={()=>handleClick('february')}><span>FEB</span></div>
      <div className={styles['month']} onClick={()=>handleClick('march')}><span>MAR</span></div>
    </div>
  )
}