'use client';

import styles from './calendar.module.css';
import { useEffect, useState, use, useRef } from 'react';
import { GameContext, DataContext } from '../utils/context';
import { ResourceMapping } from '../lib/resourceMapping';
import { CalendarDays } from '../lib/interface';
import { UpButton, DownButton } from './buttonIcons';
import CalendarTile from './calendarTile';

export default function Calendar({
  setMonth,
  setDay, 
  maxRows
}:{
  setMonth:(item:string)=>void,
  setDay:(item:number)=>void, 
  maxRows:number
}) {
  
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [monthsTab, setMonthsTab] = useState(false);
  const monthsTabRef = useRef<HTMLDivElement>(null);
  const game = use(GameContext);
  const data = use(DataContext);
  const {day_modifier, dayHeaders, monthHeaders} = ResourceMapping[game];

  useEffect(()=>{
    setMonth(monthHeaders[selectedMonth]);

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
  }, [selectedMonth])
  
  function handleClickDay(currentDay:number) {
    setDay(currentDay);
    setSelectedDay(currentDay+1);
  }

  function fillMonths() {
    const months = [...monthHeaders];
    return months.map((item, index)=>{
      return <li key={item} onClick={()=>setSelectedMonth(index)}>{item.slice(0,3)}</li>
    })
  }

  return (
    <>
      <div className={styles['calendar-header-container']}>
        <div className={styles['month-nav']} ref={monthsTabRef} onClick={()=>setMonthsTab(!monthsTab)}>
          <span className={styles['month']}>
            {monthHeaders[selectedMonth].slice(0, 1).toUpperCase() + monthHeaders[selectedMonth].slice(1)}
          </span>
          <div className={styles['nav-button']}>
            <span>{monthsTab?<UpButton/>:<DownButton/>}</span>
          </div>
          <div className={styles['selection-tab']} style={monthsTab?{visibility:'visible'}:{visibility:'hidden'}}>
            <ul className={styles['selection']}>
              {fillMonths()}
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles['calendar-body-container']}>
        <div className={styles['days-header']}>
          {dayHeaders.map((i, index)=>{ return <span key={i+index}>{i.slice(0,3)}</span> })}
        </div>

        <div className={styles['day-grid']}
          style={{
            gridTemplateColumns: `repeat(${dayHeaders.length}, 1fr)`,
            gridTemplateRows: `repeat(${maxRows}, 1fr)`
          }}>
          {data && data.map((item, index)=>{
            const dayKey = 'day' + (item.day);
            const dayStart = index === 0 ? {gridColumnStart: `${data[0].day_code}`} : undefined;
            const dayIsClickable = item.is_day_playable ? ()=>{handleClickDay(index)} : undefined;
            return (
              <div key={dayKey} onClick={dayIsClickable}>
                <CalendarTile 
                  item={item} 
                  dayStart={dayStart} 
                  day_modifier={day_modifier}
                  isSelected={selectedDay}
                />
              </div>
            )})
          }
        </div>
      </div>
    </>
  )
}
