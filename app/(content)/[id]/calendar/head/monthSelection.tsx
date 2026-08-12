import styles from './calendarHeader.module.css';
import { GameContext } from '@/app/utils/context';
import { UpButton, DownButton } from '@/app/components/svgItems';
import { ResourceMapping } from '@/app/lib/resourceMapping';
import { useEffect, useState, use, useRef } from 'react';

export default function MonthSelection({setMonth}:{setMonth:(item:string)=>void}) {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [monthsTab, setMonthsTab] = useState(false);
  const monthsTabRef = useRef<HTMLDivElement>(null);
  const game = use(GameContext);
  const {day_modifier, dayHeaders, monthHeaders} = ResourceMapping[game];
  
  useEffect(()=>{
    function handleMonthsTabClickOutside(event:MouseEvent) {
      if (monthsTabRef.current && !monthsTabRef.current.contains(event.target as Node)) {
        setMonthsTab(false);
      }
    }
    function handleMonthsTabClickInside(event:MouseEvent) {
      if (monthsTab && monthsTabRef.current && !monthsTabRef.current.contains(event.target as Node)) {
        setMonthsTab(false);
      }
    }
    document.addEventListener("mousedown", handleMonthsTabClickOutside);
    document.addEventListener("mousedown", handleMonthsTabClickInside);

    return () => document.removeEventListener("mousedown", handleMonthsTabClickOutside)
  }, [])

  function fillMonths() {
    const months = [...monthHeaders];
    return months.map((item, index)=>{
      return (
        <li key={item} 
          onClick={()=>{setMonth(monthHeaders[index]); setSelectedMonth(index)}}>
            {item.slice(0,3)}
        </li>
    )})
  }

  return (
    <div className={styles['month-nav']} 
      ref={monthsTabRef} 
      onClick={()=>setMonthsTab(!monthsTab)}
    >
      <div className={styles['month']}>
        <span className={styles['month-hover-bg']} data-active={monthsTab}></span>
        <span className={styles['month-text']}>
          {monthHeaders[selectedMonth].slice(0, 1).toUpperCase() + monthHeaders[selectedMonth].slice(1)}
        </span>
      </div>
      <div className={styles['nav-button']} data-active={monthsTab}>
        <span>{monthsTab?<UpButton/>:<DownButton/>}</span>
      </div>
      <div className={styles['selection-tab']} data-active={monthsTab}>
        <ul className={styles['selection']}>
          {fillMonths()}
        </ul>
      </div>
    </div>
  )
}