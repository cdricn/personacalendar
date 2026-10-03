import styles from './tabInfo.module.css';
import { ResourceMapping } from '@/app/lib/resourceMapping';
import { GameContext, DataContext } from '@/app/utils/context';
import { use } from 'react';
import InfoBlock from '@/app/components/infoBlock';

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

  return (
    <>
      <div style={{display: 'flex', gap: 'var(--size-12)'}}>
        <InfoBlock 
          blockHeader={'Day'}
          blockSubHeader={time_day}
          blockIcon={dayWeather}
          blockSubIcon={'daySpecialWeather'}
          blockDisplay={blockDisplay} 
        />
        <InfoBlock 
          blockHeader={'Night'}
          blockSubHeader={time_night}
          blockIcon={nightWeather}
          blockSubIcon={'nightSpecialWeather'} 
          blockDisplay={blockDisplay} 
        />
      </div>
      <InfoBlock 
        blockHeader={'Alert'}
        blockInfo={alert}
        blockStyling={'alert'}
        blockDisplay={alertDisplay} 
      />
      <InfoBlock 
        blockHeader={'Notice'}
        blockInfo={notice}
        blockStyling={'notice'}
        blockDisplay={noticeDisplay} 
      />
      <InfoBlock 
        blockHeader={'Social Stats'}
        blockInfo={missable_stat}
        blockStyling={'stats'}
        blockDisplay={statDisplay} 
      />
      <InfoBlock 
        blockHeader={'Items'}
        blockInfo={missable_item}
        blockStyling={'items'}
        blockDisplay={itemDisplay} 
      />
      <InfoBlock 
        blockHeader={"Story event."}
        blockDisplay={storyDisplay} 
      />
    </>
  )
}

