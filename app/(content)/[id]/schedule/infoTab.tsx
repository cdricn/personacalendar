import styles from './infoTab.module.css';
import { DataContext } from '@/app/utils/context';
import { use } from 'react';

export default function InfoTab({currentDay}:{currentDay:number}) {
  const data = use(DataContext);
  if (!data) return;

  const scheduleData = data[currentDay] ? data[currentDay] : data[data.length-1];
  const { 
    day, day_code, day_weather, night_weather, special_day_weather, special_night_weather,
    world, activities, social_events, events, events_spoiler, day_activities, night_activities,
    is_day_playable  
  } = scheduleData;
  
  const dayStatus = !day_activities ? undefined :
    day_activities === 'Unavailable' ? 'unavailable' : 
    day_activities === 'Limited' ? 'limited' :
    'free';
  const blockDisplay = is_day_playable;
  const worldDisplay = Boolean(world);
  const activityDisplay = Boolean(activities); 

  return (
    <>

      <div className={styles['block']} data-display={blockDisplay}>
        <div className={styles['block-header']}>
          <div className={styles['header-status']}>
            <span data-display={is_day_playable} data-status-color={dayStatus}/>
            <h3>Day</h3>
          </div>
          <span>{day_activities}</span>
        </div>
        <div className={styles['block-info-container']}>
          <div className={styles['block-info']} data-display={dayStatus==='free'}>
            <span data-display={special_day_weather ? true : false}>
              Modifier: <span> {special_day_weather}</span>
            </span>
            <div className={styles['info']} data-display={worldDisplay}>
              <h4>World</h4>
              <ul>
                <li>No something day</li>
              </ul>
            </div>
            <div className={styles['info']} data-display={activityDisplay}>
              <h4>Activities</h4>
            </div>
          </div>
          <div className={styles['block-info-filler']} data-display={dayStatus==='free'}>
          </div>
        </div>
      </div>

      <div className={styles['block']} data-display={blockDisplay}>
        <div className={styles['block-header']}>
          <div className={styles['header-status']}>
            <span data-display={is_day_playable} data-status-color={dayStatus}/>
            <h3>Night</h3>
          </div>
          <span>{day_activities}</span>
        </div>
        <div className={styles['block-info-container']}>
          <div className={styles['block-info']} data-display={dayStatus==='free'}>
            <span data-display={special_day_weather ? true : false}>
              Modifier: <span> {special_day_weather}</span>
            </span>
            <div className={styles['info']} data-display={worldDisplay}>
              <h4>World</h4>
              <ul>
                <li>No something day</li>
              </ul>
            </div>
            <div className={styles['info']} data-display={activityDisplay}>
              <h4>Activities</h4>
            </div>
          </div>
          <div className={styles['block-info-filler']} data-display={dayStatus==='free'}>
          </div>
        </div>
      </div>

      <div className={styles['block']} data-display={blockDisplay && events}>
        <h3>Story</h3>
        <div>
          {events && events[0] === 'Story event.' ? 
            <details>
              <summary>Spoilers:</summary>
              <ul className={styles['story-spoiler']}>
                {events_spoiler && events_spoiler.map((item)=><li><p>- {item}</p></li>)}
              </ul>
            </details>
            :
            <p className={styles['story-normal']}>{events}</p>
          }
        </div>
      </div>
    </>
  )
}

