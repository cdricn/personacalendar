'use client';

import styles from './calendar.module.css';
import { useEffect, useState, use, useRef } from 'react';
import { GameContext, DataContext } from '../utils/context';
import { ResourceMapping } from '../lib/resourceMapping';
import { CalendarDays } from '../lib/interface';
import { UpButton, DownButton } from './buttonIcons';

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
  const [monthsTab, setMonthsTab] = useState(false);
  const monthsTabRef = useRef<HTMLDivElement>(null);
  const game = use(GameContext);
  const data = use(DataContext);
  const {day_modifier, dayHeaders, monthHeaders} = ResourceMapping[game]; //remove front slash

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
            const dayStart = index===0 ? {gridColumnStart: `${data[0].day_code}`} : undefined;
            const dayIsClickable = item.is_day_playable ? ()=>{handleClickDay(index)} : undefined;
            const dayStyle = item.is_day_playable ? undefined : {
                backgroundColor: 'var(--color-gray-inactive)', 
                cursor: 'auto', 
                color: 'var(--color-inactive-day)'
              };
            const weatherDayStyle = { 
              alignSelf: item.night_weather ? 'flex-start' : 'center',
              transform: item.night_weather ? 'translate(1px, 5px)' : undefined
            };
            const weatherNightStyle = { 
              alignSelf: item.day_weather ? 'flex-end' : 'center',
              transform: item.day_weather ? 'translate(-1px, -3px)' : undefined
            };

            return (
              <div key={dayKey} 
                className={styles['day-container']} 
                onClick={dayIsClickable}
                style={dayStart}
              >
                <div className={styles['day']} style={dayStyle}>
                  <div className={styles['weather-icon-container']}>
                    {item.day_weather ? <img style={weatherDayStyle} src={day_modifier[item.day_weather].src} alt={day_modifier[item.day_weather].alt} /> : null}
                    {item.night_weather ? <img style={weatherNightStyle} src={day_modifier[item.night_weather].src} alt={day_modifier[item.night_weather].alt} /> : null}
                  </div>
                  <span>{item.day}</span>
                  <div className={styles['hint-icons-container']}>
                    {addSymbols(item)}
                  </div>
                </div>
              </div>
            )})
          }
        </div>
      </div>
    </>
  )
}
