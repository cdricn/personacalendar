import styles from './calendarBody.module.css';
import { useState, use } from 'react';
import { DateContext, DataContext, ResourcesContext } from '../../../utils/context';
import CalendarTile from './calendarTile';

export default function CalendarBody({
  clickDay
}:{
  clickDay:(item:number)=>void
}) {
  
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const {weather_icons, dayHeaders} = use(ResourcesContext);
  const {calendarData} = use(DataContext);
  const {currentMonth} = use(DateContext);

  if (!calendarData) return;
  const currentDate = calendarData[currentMonth];

  const leftOverDays = 7 - currentDate[currentDate.length-1].day_code;
  const frontTilesFiller = new Array(currentDate[0].day_code-1).fill('top');
  const bottomTilesFiller = new Array(leftOverDays).fill('bottom');

  function handleClickDay(currentDay:number) {
    clickDay(currentDay);
    setSelectedDay(currentDay+1);
  }

  return (
    <div className={styles['calendar-body-container']}>
      <div className={styles['days-header']}>
        {dayHeaders.map((i, index)=>{ return <span key={i+index}>{i.slice(0,3)}</span> })}
      </div>

      <div className={styles['day-grid']} style={{gridTemplateColumns: `repeat(${dayHeaders.length}, 1fr)`}}>
        
        {frontTilesFiller.map((item, index) => <div key={'filler'+item+index} className={styles['filler-tile']}/> )}
        
        {currentDate && currentDate.map((item, index)=>{
          const tileKey = 'day' + (item.day);
          const dayStart = index === 0 ? {gridColumnStart: `${currentDate[0].day_code}`} : undefined;
          const dayIsClickable = item.is_day_playable ? ()=>{handleClickDay(index)} : undefined;
          return (
            <div key={tileKey} onClick={dayIsClickable} style={dayStart}>
              <CalendarTile 
                item={item} 
                weather_icons={weather_icons}
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
