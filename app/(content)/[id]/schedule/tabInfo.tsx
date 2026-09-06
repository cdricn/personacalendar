import styles from './tabInfo.module.css';
import { ResourceMapping } from '@/app/lib/resourceMapping';
import { GameContext, DataContext } from '@/app/utils/context';
import { use } from 'react';

interface InfoBlock {
  blockHeader: string;
  blockRestriction: string | null;
  blockWeather: string | null;
  blockSpecialWeather: string | null;
  blockActivity: string[] | null
}

export default function TabInfo({currentDay}:{currentDay:number}) {
  const game = use(GameContext);
  const data = use(DataContext);
  const currentGame = ResourceMapping[game];
  
  if (!currentGame) return;
  const {day_modifier, special_day_modifier} = ResourceMapping[game];

  if (!data) return;
  const scheduleData = data[currentDay] ? data[currentDay] : data[data.length-1];
  const { 
    day_weather, night_weather, special_day_weather, special_night_weather,
    world, activities, social_events, events, events_spoiler, day_restriction, night_restriction,
    is_day_playable  
  } = scheduleData;

  if (!day_weather || !night_weather) return; //im dumb
  const dayWeather = day_modifier[day_weather].src;
  const nightWeather = day_modifier[night_weather].src;

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

    if (!blockWeather) return;

    return (
      <div className={styles['block']} data-display={blockDisplay}>
        <div className={styles['block-header']}>
          <div className={styles['block-name']}>
            <h3>{blockHeader}</h3>
            <span>{blockRestriction}</span>
          </div>
          <div className={styles['block-weather']}>
            <img src={blockWeather} alt={''}/>
          </div>
        </div>
        <div className={styles['block-info']} data-display={dayStatus==='free'}>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles['info']} data-display={worldDisplay}>
        <h4>No classes ({world})</h4>
      </div>
      {InfoBlock(
        {
          blockHeader: 'Day',
          blockRestriction: day_restriction,
          blockWeather: dayWeather,
          blockSpecialWeather: 'daySpecialWeather',
          blockActivity: activities 
        })
      }

      {InfoBlock(
        {
          blockHeader: 'Night',
          blockRestriction: night_restriction,
          blockWeather: nightWeather,
          blockSpecialWeather: 'nightSpecialWeather',
          blockActivity: activities
        })
      }
    </>
  )
}

