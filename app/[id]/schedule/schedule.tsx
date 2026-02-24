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
      <div className={styles['schedule-date']}>
        <div className={styles['date']}>
          <span>{`${monthMapping[month]}/${day}`}</span>
        </div>
        <div className={styles['spoiler-button-container']}>
          <span>Spoiler</span>
          <div className={styles['spoiler-button']}>
            <span onClick={()=>setSpoiler(true)}>ON</span>
            <span onClick={()=>setSpoiler(false)}>OFF</span>
          </div>
        </div>
      </div>

      <div className={styles['info-body']}>
        <div className={styles['schedule-options']}>
          <span onClick={()=>handleScheduleClick('schedule')}>Schedule</span>
          <span onClick={()=>handleScheduleClick('confidants')}>Confidants</span>
          <span onClick={()=>handleScheduleClick('info')}>Info</span>
        </div>

        <div className={styles['schedule-info']}>
          <div className={styles['info-container']}>
            {day_weather === null ? null :
              <div className={styles['info-header']}>
                <Weather iconName={day_weather} special_iconName={special_day_weather}/>
                <h3>Day</h3>
              </div>
            }
          </div>
          <div className={styles['info-container']}>
            {night_weather === null ? null :
              <div className={styles['info-header']}>
                <Weather iconName={night_weather} special_iconName={special_night_weather}/>
                <h3>Night</h3>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}
