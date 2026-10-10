import styles from './calendarHeader.module.css';
import { GameContext, DataContext } from '@/app/utils/context';
import { UpButton, DownButton } from '@/app/components/svgItems';
import { monthsToDigits, ResourceMapping } from '@/app/lib/resourceMapping';
import { useState, use } from 'react';
import useOpenOnClick from '@/app/utils/useOpenOnClick';

export default function CalendarHeader({
  currentDay, 
  currentMonth,
  clickMonth
}:{
  currentDay: number, 
  currentMonth: string,
  clickMonth:(item:string)=>void
}) {
  
  const [selectedMonth, setSelectedMonth] = useState(0);
  const {ref, isOpen} = useOpenOnClick();
  const game = use(GameContext);
  const data = use(DataContext);
  const currentGame = ResourceMapping[game];

  if (!currentGame) return;
  const {monthHeaders} = ResourceMapping[game];
  
  if (!currentGame) return;
  const {dayHeaders} = ResourceMapping[game];

  if (!data) return;
  const scheduleData = data[currentDay] ? data[currentDay] : data[data.length-1];

  function fillMonths() {
    const months = [...monthHeaders];
    return months.map((item, index)=>
      <li key={item} 
        onClick={()=>{clickMonth(monthHeaders[index]); setSelectedMonth(index)}}>
          {item.slice(0,3)}
      </li>
    )
  }

  return (
    <div className={styles['calendar-header']}>
      <div className={styles['month-nav']} ref={ref} >
        <span className={styles['month-hover-bg']} data-active={isOpen}></span>
        <div className={styles['month']}>
          <span className={styles['month-text']}>
            {monthHeaders[selectedMonth]}
          </span>
        </div>
        <div className={styles['nav-button']} data-active={isOpen} >
          <span>{isOpen?<UpButton/>:<DownButton/>}</span>
        </div>
        <div className={styles['selection-tab']} data-active={isOpen}>
          <ul className={styles['selection']}>
            {fillMonths()}
          </ul>
        </div>
      </div>
      <div className={styles['selected-date']}>
        <p>{monthsToDigits[currentMonth]}/{scheduleData.day} {dayHeaders[scheduleData.day_code-1]}</p>
      </div>
    </div>
  )
}