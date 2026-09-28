import styles from './tabInfo.module.css';
import { ResourceMapping } from '@/app/lib/resourceMapping';
import { GameContext, DataContext } from '@/app/utils/context';
import { use } from 'react';

interface InfoBlock {
  blockHeader: string;
  blockSubHeader?: string | null;
  blockIcon?: string | null;
  blockSubIcon?: string | null;
  blockInfo?: string[] | null;
  blockStyling?: string
}

export default function TabInfo({currentDay}:{currentDay:number}) {
  const game = use(GameContext);
  const data = use(DataContext);
  const currentGame = ResourceMapping[game];
  
  if (!currentGame) return;
  const {weather_icons, special_day_modifier} = ResourceMapping[game];

  if (!data) return;
  const scheduleData = data[currentDay] ? data[currentDay] : data[data.length-1];
  const { 
    day_weather, night_weather, special_day_weather, special_night_weather, world, alert, 
    notice, missable_stat, missable_item, social_events, events, events_spoiler, time_day, time_night,
    is_day_playable  
  } = scheduleData;

  const dayWeather = day_weather ? weather_icons[day_weather].src : '';
  const nightWeather = night_weather ? weather_icons[night_weather].src : '';

  const blockDisplay = is_day_playable;
  const worldDisplay = Boolean(world);
  const alertDisplay = Boolean(alert);
  const noticeDisplay = Boolean(notice);
  const statDisplay = Boolean(missable_stat);
  const itemDisplay = Boolean(missable_item);
  const storyDisplay = Boolean(events);

  function InfoBlock({
    blockHeader, 
    blockSubHeader, 
    blockIcon, 
    blockSubIcon, 
    blockInfo,
    blockStyling
  } : InfoBlock) {

    const infoDisplay = Boolean(blockInfo);
    return (
      <div className={styles['block']} data-styling={blockStyling}>
        <div className={styles['block-header']}>
          <div className={styles['block-name']}>
            <h3>{blockHeader}</h3>
            <span className={styles['block-name-subtext']} data-text-color={blockSubHeader}>
              {blockSubHeader && blockSubHeader.charAt(0).toUpperCase() + blockSubHeader.slice(1)}
            </span>
          </div>
          <div className={styles['block-weather']}>
            {blockIcon && <img src={blockIcon} alt={''}/>}
          </div>
        </div>
        <ul className={styles['block-info']} data-display={infoDisplay}>
          {blockInfo?.map((item, index)=> {
            return (
              <li key={item+index}>{item}</li>
            )})
          }
        </ul>
      </div>
    )
  }

  return (
    <>
      <div className={styles['block-top']} data-display={blockDisplay}>
        {InfoBlock({
            blockHeader: 'Day', 
            blockSubHeader: time_day, 
            blockIcon: dayWeather, 
            blockSubIcon: 'daySpecialWeather',
          })
        }
        {InfoBlock({
            blockHeader: 'Night', 
            blockSubHeader: time_night, 
            blockIcon: nightWeather, 
            blockSubIcon: 'nightSpecialWeather',
          })
        }
      </div>
      <div className={styles['block-section']} data-display={storyDisplay}>
        {InfoBlock({
            blockHeader: 'Story',
            blockInfo: events_spoiler,
            blockStyling: 'story'
          })
        }
      </div>
      <div className={styles['block-section']} data-display={alertDisplay}>
        {InfoBlock({
            blockHeader: 'Alert',
            blockInfo: alert,
            blockStyling: 'alert'
          })
        }
      </div>
      <div className={styles['block-section']} data-display={noticeDisplay}>
        {InfoBlock({
            blockHeader: 'Notice',
            blockInfo: notice,
            blockStyling: 'notice'
          })
        }
      </div>
      <div className={styles['block-section']} data-display={statDisplay}>
        {InfoBlock({
            blockHeader: 'Social Stats',
            blockInfo: missable_stat
          })
        }
      </div>
      <div className={styles['block-section']} data-display={itemDisplay}>
        {InfoBlock({
            blockHeader: 'Items',
            blockInfo: missable_item
          })
        }
      </div>
    </>
  )
}

