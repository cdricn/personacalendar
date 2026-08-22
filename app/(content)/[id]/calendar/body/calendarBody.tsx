'use client';

import styles from './calendarBody.module.css';
import { useState, use } from 'react';
import { GameContext, DataContext } from '../../../../utils/context';
import { ResourceMapping } from '../../../../lib/resourceMapping';
import CalendarTile from './calendarTile';

export default function CalendarBody({
  setDay
}:{
  setDay:(item:number)=>void
}) {
  
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const game = use(GameContext);
  const data = use(DataContext);

  const {day_modifier, dayHeaders} = ResourceMapping[game];

  if (!data) return;

  const leftOverDays = 7 - data[data.length-1].day_code;
  const frontTilesFiller = new Array(data[0].day_code-1).fill('top');
  const bottomTilesFiller = new Array(leftOverDays).fill('bottom');

  function handleClickDay(currentDay:number) {
    setDay(currentDay);
    setSelectedDay(currentDay+1);
  }

  return (
    <div className={styles['calendar-body-container']}>
      <div className={styles['days-header']}>
        {dayHeaders.map((i, index)=>{ return <span key={i+index}>{i.slice(0,3)}</span> })}
      </div>

      <div className={styles['day-grid']} style={{gridTemplateColumns: `repeat(${dayHeaders.length}, 1fr)`}}>
        
        {frontTilesFiller.map((item, index) => <div key={'filler'+item+index} className={styles['filler-tile']}/> )}
        
        {data && data.map((item, index)=>{
          const tileKey = 'day' + (item.day);
          const dayStart = index === 0 ? {gridColumnStart: `${data[0].day_code}`} : undefined;
          const dayIsClickable = item.is_day_playable ? ()=>{handleClickDay(index)} : undefined;
          return (
            <div key={tileKey} onClick={dayIsClickable} style={dayStart}>
              <CalendarTile 
                item={item} 
                day_modifier={day_modifier}
                isSelected={selectedDay}
              />
            </div>
          )})
        }

        {bottomTilesFiller.map((item, index) => <div key={'filler'+item+index} className={styles['filler-tile']}/> )}
      
      </div>
    </div>
  )
}
