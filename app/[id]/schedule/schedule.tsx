'use client';

import { CalendarData } from '@/app/lib/interface';
import styles from './schedule.module.css';
import { useState } from 'react';

export default function Schedule({scheduleData}:{scheduleData:CalendarData}) {
  const [isDay, setIsDay] = useState(true);
  const [spoiler, setSpoiler] = useState(false);
  const { 
    month, day, day_code, day_weather, night_weather, special_day_weather, special_night_weather,
    city_events, confidant_events, events, events_spoiler, day_activities, night_activities    
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

  function handleScheduleClick() {

  }

  function handleTimeClick() {
    setIsDay(!isDay);
  } 

  return (
    <>
      <div className={styles['date-container']}>
        <div className={styles['time-icon']} onClick={handleTimeClick}>
          <div className={styles['weather-icon']}>

          </div>
        </div>
        <span>{`${monthMapping[month]}/${day}`}</span>
        <span>{isDay ? day_activities : night_activities}</span>
      </div>
      <div className={styles['schedule-options']}>
        <span id='events' onClick={handleScheduleClick}>Story Events</span>
        <span id='confidant_events' onClick={handleScheduleClick}>Confidants</span>
        <span id='city_events' onClick={handleScheduleClick}>City Events</span>
        <div className={styles['spoiler-button']}>
          <span id='spoiler' onClick={()=>setSpoiler(!spoiler)}>Spoiler</span>
          {spoiler ? 
            <span>ON</span> : <span>OFF</span>}
        </div>
      </div>
      <div className={styles['schedule-info']}>

      </div>
    </>
  )
}

/*
  month: string,
  day: number,
  day_code: number,
  day_weather: string | null,
  night_weather: string | null,
  special_day_weather: string | null,
  special_night_weather: string | null,
  city_events: Array<string> | null| string,
  confidant_events: Array<string> | null| string,
  events: Array<string> | null | string,
  events_spoiler: Array<string> | null | string,
  =day_activities: string | null,
  =night_activities: string | null
*/