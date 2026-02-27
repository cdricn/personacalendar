'use client';

import styles from './calendarBlock.module.css';
import { DataContext } from '@/app/utils/context';
import { use } from 'react';
// icons used: FaExclamation, FaGlobeAsia, GiCardAceHearts ri/fa, ri/gi

export default function CalendarBlock({day}:{day:number}) {
  const data = use(DataContext);

  if (!data) return <></>;
  const {confidant_events, events, activities} = data[day];

  const bondIconClamp = `clamp(15px, calc(0.9375rem + ((1vw - 2.8px) * 2.7439)), 60px)`;
  const alertIconClamp = `clamp(8px, calc(0.5rem + ((1vw - 2.8px) * 1.3415)), 30px)`;

  function calendarHint(src:string, clamp:string) {
    return (
      <img className={styles['hint-icon']} src={src} 
        style={{
          width: clamp
        }}/>
    )
  }

  return (
    <div className={styles['hint-icons-container']}>
      {confidant_events===null?null: calendarHint('/P_Confidant.png', bondIconClamp)}
      {activities===null?null: calendarHint('/P_Alert_Yellow.png', alertIconClamp)}
      {events===null?null: calendarHint('/P_Alert_Red.png', alertIconClamp)}
    </div>
  )
}