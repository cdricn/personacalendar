import styles from './calendarHeader.module.css';
import { ResourcesContext, DataContext, DateContext } from '@/app/utils/context';
import { UpButton, DownButton } from '@/app/components/svgItems';
import { monthsToDigits } from '@/app/lib/resourceMapping';
import { useState, use } from 'react';
import useOpenOnClick from '@/app/utils/useOpenOnClick';

export default function CalendarHeader({
  clickMonth
}:{
  clickMonth:(item:string)=>void
}) {
  
  const [selectedMonth, setSelectedMonth] = useState(0);
  const {ref, isOpen} = useOpenOnClick();
  const {calendarData} = use(DataContext);
  const {currentDay, currentMonth} = use(DateContext);
  const {dayHeaders, monthHeaders} = use(ResourcesContext);

  if (!calendarData) return;
  const currentDate = calendarData[currentMonth];
  const scheduleData = currentDate[currentDay] ? currentDate[currentDay] : currentDate[currentDate.length-1];

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
      <div className={styles['month-selection-container']} ref={ref} >
        <span>{monthHeaders[selectedMonth]}</span>
        <div className={styles['month-selection-button']} data-active={isOpen} >
          <span>{isOpen?<UpButton/>:<DownButton/>}</span>
        </div>
        <div className={styles['selection-dropdown']} data-active={isOpen}>
          <ul className={styles['selections-list']}>
            {fillMonths()}
          </ul>
        </div>
      </div>
      <div className={styles['current-date-display']}>
        <p>{monthsToDigits[currentMonth]}/{scheduleData.day} {dayHeaders[scheduleData.day_code-1]}</p>
      </div>
    </div>
  )
}