'use client';

import styles from './schedule.module.css';
import { GameContext, DataContext } from '@/app/utils/context';
import { use } from 'react';
import { ResourceMapping } from '@/app/lib/resourceMapping';
import ActivitiesBlock from './activitiesBlock';

export default function Schedule({currentDay, currentMonth}:{currentDay:number, currentMonth:string}) {
  const game = use(GameContext);
  const data = use(DataContext);
  if (!data) return;

  const {dayHeaders} = ResourceMapping[game];
  const scheduleData = data[currentDay] ? data[currentDay] : data[data.length-1];
  const { 
    day, day_code, day_weather, night_weather, special_day_weather, special_night_weather,
    world, activities, social_events, events, events_spoiler, day_activities, night_activities,
    is_day_playable  
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
      <div className={styles['section-header-container']}>
        <div className={styles['section-header']}>
          <h2>{monthToDigit[currentMonth]}/{day} {dayHeaders[day_code-1]}</h2>
        </div>
      </div>

      
      <div className={styles['schedule']}>
        <ActivitiesBlock 
          blockTitle='Day'
          weather={day_weather}
          specialDayWeather={special_day_weather}
          world={world}
          activities={activities}
          socialEvents={social_events}
          events={events}
          eventsSpoiler={events_spoiler}
          dayAvailability={day_activities}
          isDayPlayable={is_day_playable}
        />
        <ActivitiesBlock 
          blockTitle='Night'
          weather={night_weather}
          specialDayWeather={special_night_weather}
          world={world}
          activities={activities}
          socialEvents={social_events}
          events={events}
          eventsSpoiler={events_spoiler}
          dayAvailability={night_activities}
          isDayPlayable={is_day_playable}
        />
        <div>
          <h3>Events</h3>
        </div>
        <div>
          <h3>Story</h3>
        </div>
      </div>
    </>
  )
}