'use client';

import styles from './schedule.module.css';
import { DataContext } from '@/app/utils/context';
import { use } from 'react';
import Weather from '../../../components/weather';
import InfoBlob from '../../../components/infoBlob';
import Confidants from '../../../components/confidants';

export default function Schedule({currentDay}:{currentDay:number}) {
  const data = use(DataContext);
  if (!data) return <></>;
  
  const scheduleData = data[currentDay];
  const { 
    day, day_weather, night_weather, special_day_weather, special_night_weather,
    world, activities, social_events, events, events_spoiler, day_activities, night_activities    
  } = scheduleData;

  const monthToDigit : {[month:string]: string} = {
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
      <div className={styles['section-header']}>
        <h2></h2>
        <div className={styles['date']}>
          <span>month</span>
          <span>/</span>
          <span>{day}</span>
        </div>
      </div>

      <div className={styles['day-modifiers']}>
        <div className={styles['modifier']}>
          <span>{day_activities ? day_activities : 'N/A'}</span>
        </div>
        <div className={styles['modifier']}>
          <span>{night_activities ? night_activities : 'N/A'}</span>
        </div>
      </div>

      <div className={styles['schedule']}>
        <div className={styles['info-block']}>
          <h3>Schedule</h3>
        </div>
        <div className={styles['info-block']}>
          <h3>Confidant Events</h3>
        </div>
        <div className={styles['info-block']}>
          <h3>Confidants</h3>
          <Confidants currentDay={currentDay}/>
        </div>
        <div className={styles['info-block']}>
          <h3>Activities</h3>
        </div>
        <p>{world}</p>
      </div>
    </>
  )
}