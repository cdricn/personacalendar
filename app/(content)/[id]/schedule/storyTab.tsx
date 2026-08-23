import styles from './storyTab.module.css';
import { DataContext } from '@/app/utils/context';
import { use } from 'react';

export default function StoryTab({currentDay}:{currentDay:number}) {
  const data = use(DataContext);
  if (!data) return;

  const scheduleData = data[currentDay] ? data[currentDay] : data[data.length-1];
  const { 
    day_weather, night_weather, special_day_weather, special_night_weather,
    social_events, events, events_spoiler
  } = scheduleData;

  return (
    <div className={styles['story-container']}>
      <h3>{events}</h3>
        {events && events[0] === 'Story event.' ? 
          <details className={styles['spoiler-container']}>
            <summary className={styles['spoiler-button']}>Spoilers</summary>
            <ul className={styles['spoiler-list']}>
              {events_spoiler && events_spoiler.map((item, index)=><li key={index}><p>{item}</p></li>)}
            </ul>
          </details> : <></>
        }
    </div>
  )
}

