'use client';

import { CalendarData } from '@/app/lib/interface';
import styles from './schedule.module.css';
import { useState } from 'react';
import Weather from './components/weather';

export default function Schedule({scheduleData}:{scheduleData:CalendarData}) {
  const [clickedOption, setClickedOption] = useState('schedule');
  const [spoiler, setSpoiler] = useState(false);
  const { 
    month, day, day_code, day_weather, night_weather, special_day_weather, special_night_weather,
    world, activities, confidant_events, events, events_spoiler, day_activities, night_activities    
  } = scheduleData;

  const monthMapping : {[month:string]: string} = {
    january: '1',
    february: '2',
    march: '3',
    april: '4',
    may: '5',
    june: '6',
    july: '7',
    august: '8',
    september: '9',
    october: '10',
    november: '11',
    december: '12',
  };

  function handleScheduleClick(option:string) {
    setClickedOption(option);
  }

  function showInfo(info:Array<string> | null) {
    if (info!==null) {
      return info.map((i)=>{
        return <><span className={styles['spoiler']}>{i}</span><br/></>
      })
    } else return null
  }

  return (
    <>
      <div className={styles['schedule-header']}>
        <h2>WORLD</h2>
        <div className={styles['date']}>
          <span>{`${monthMapping[month]}/${day}`}</span>
        </div>
      </div>
      <div className={styles['day-modifiers']}>
        <div className={styles['modifier']}>
          {day_weather === null ? null :
            <Weather time='day' iconName={day_weather} special_iconName={special_day_weather}/>
          }
          <span>{day_activities ? day_activities : '---'}</span>
        </div>
        <div className={styles['modifier']}>
          {night_weather === null ? null :
            <Weather time='night' iconName={night_weather} special_iconName={special_night_weather}/>
          }
          <span>{night_activities ? night_activities : '---'}</span>
        </div>
      </div>
      <div className={styles['events']}>

      </div>
    </>
  )
}