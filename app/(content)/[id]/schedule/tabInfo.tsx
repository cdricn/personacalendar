import styles from './tabInfo.module.css';
import { DataContext } from '@/app/utils/context';
import { use } from 'react';

interface InfoBlock {
  blockHeader: string;
  blockRestriction: string | null;
  blockWeather: string | null;
  blockSpecialWeather: string | null;
  blockActivity: string[] | null
}

export default function TabInfo({currentDay}:{currentDay:number}) {
  const data = use(DataContext);
  if (!data) return;

  const scheduleData = data[currentDay] ? data[currentDay] : data[data.length-1];
  const { 
    day_weather, night_weather, special_day_weather, special_night_weather,
    world, activities, social_events, events, events_spoiler, day_restriction, night_restriction,
    is_day_playable  
  } = scheduleData;
  const blockDisplay = is_day_playable;
  const worldDisplay = Boolean(world);
  const activityDisplay = Boolean(activities); 

  function InfoBlock({
    blockHeader, 
    blockRestriction,
    blockWeather,
    blockSpecialWeather,
    blockActivity
  } : InfoBlock) {

    const dayStatus = !blockRestriction ? undefined :
      blockRestriction === 'Unavailable' ? 'unavailable' : 
      blockRestriction === 'Limited' ? 'limited' :
      'free';

    return (
      <div className={styles['block']} data-display={blockDisplay}>
        <div className={styles['block-header']}>
          <div className={styles['header-status']}>
            <span data-display={is_day_playable} data-status-color={dayStatus}/>
            <h3>{blockHeader}</h3>
          </div>
          <span>{blockRestriction}</span>
        </div>
        <div className={styles['block-info-container']}>
          <div className={styles['block-info']} data-display={dayStatus==='free'}>
            {blockWeather}
            <span data-display={blockSpecialWeather ? true : false}>
              Modifier: <span> {blockSpecialWeather}</span>
            </span>
          </div>
          <div className={styles['block-info-filler']} data-display={dayStatus==='free'}>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles['info']} data-display={worldDisplay}>
        <h4>World</h4>
        <ul>
          <li>No something day</li>
        </ul>
      </div>
      <div className={styles['info']} data-display={activityDisplay}>
        <h4>Activities</h4>
        <li>
          {activities ? activities.map((item, index)=>
            <ul key={item+index}>{item}</ul>
            ) : null
          }
        </li>
      </div>
      {InfoBlock(
        {
          blockHeader: 'Day',
          blockRestriction: day_restriction,
          blockWeather: day_weather,
          blockSpecialWeather: special_day_weather,
          blockActivity: activities 
        })
      }

      {InfoBlock(
        {
          blockHeader: 'Night',
          blockRestriction: night_restriction,
          blockWeather: night_weather,
          blockSpecialWeather: special_night_weather,
          blockActivity: activities
        })
      }
    </>
  )
}

