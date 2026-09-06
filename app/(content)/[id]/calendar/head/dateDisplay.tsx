import styles from './calendarHeader.module.css';
import { use } from 'react';
import { GameContext, DataContext } from '../../../../utils/context';
import { monthsToDigits, ResourceMapping } from '../../../../lib/resourceMapping';

export default function DateDisplay({
  currentDay, 
  currentMonth
}:{
  currentDay: number, 
  currentMonth: string
}) {

  const game = use(GameContext);
  const data = use(DataContext);
  const currentGame = ResourceMapping[game];
  
  if (!currentGame) return;
  const {dayHeaders} = ResourceMapping[game];

  if (!data) return;
  const scheduleData = data[currentDay] ? data[currentDay] : data[data.length-1];

  return (
    <div className={styles['selected-date']}>
      <p>{monthsToDigits[currentMonth]}/{scheduleData.day} {dayHeaders[scheduleData.day_code-1]}</p>
    </div>
  )
}