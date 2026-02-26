'use client';

import styles from './schedule.module.css';
import { CalendarData } from '@/app/lib/interface';
import Weather from './components/weather';
import Events from './components/events';
import Confidants from './components/confidants';

export default function Schedule({scheduleData}:{scheduleData:CalendarData}) {
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

  return (
    <>
      <div className={styles['schedule-header']}>
        <h2>WORLD</h2>
        <div className={styles['date']}>
          <span>{monthMapping[month]}</span>
          <span>/</span>
          <span>{day}</span>
        </div>
      </div>

      <div className={styles['day-modifiers']}>
        <div className={styles['modifier']}>
          <Weather time='day' iconName={day_weather} special_iconName={special_day_weather}/>
          <span>{day_activities ? day_activities : 'N/A'}</span>
        </div>
        <div className={styles['modifier']}>
          <Weather time='night' iconName={night_weather} special_iconName={special_night_weather}/>
          <span>{night_activities ? night_activities : 'N/A'}</span>
        </div>
      </div>

      <div className={styles['schedule']}>
        <div className={styles['schedule-info-block']}>
          <Events invalidDay={day_activities===null} world={world} events={events} events_spoiler={events_spoiler}/>
        </div>
        <div className={styles['schedule-info-block']}>
          <Confidants confidant_events={confidant_events}/>
        </div>
        <div className={styles['schedule-info-block']}>
          <h3>Activities</h3>
          <h3>Limited Activities</h3>
        </div>
      </div>
    </>
  )
}