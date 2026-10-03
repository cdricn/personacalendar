import { ResourceMapping } from '@/app/lib/resourceMapping';
import { GameContext, DataContext } from '@/app/utils/context';
import { use } from 'react';
import InfoBlock from '@/app/components/infoBlock';
import { InfoBlockInterface } from '@/app/lib/interface';

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

  const infoBlockDetails : InfoBlockInterface[] = [
    {blockHeader: 'Alert', blockSubHeader: null, blockIcon: null, blockSubIcon: null, blockInfo: alert, blockStyling: 'alert', blockDisplay: alert},
    {blockHeader: 'Notice', blockSubHeader: null, blockIcon: null, blockSubIcon: null, blockInfo: notice, blockStyling: 'notice', blockDisplay: notice},
    {blockHeader: 'Social Stats', blockSubHeader: null, blockIcon: null, blockSubIcon: null, blockInfo: missable_stat, blockStyling: 'stats', blockDisplay: missable_stat},
    {blockHeader: 'Items', blockSubHeader: null, blockIcon: null, blockSubIcon: null, blockInfo: missable_item, blockStyling: 'items', blockDisplay: missable_item},
    {blockHeader: 'Story event.', blockSubHeader: null, blockIcon: null, blockSubIcon: null, blockInfo: null, blockStyling: null, blockDisplay: events},
  ];

  return (
    <>
      <div style={{display: 'flex', gap: 'var(--size-12)'}}>
        <InfoBlock 
          blockHeader={'Day'}
          blockSubHeader={time_day}
          blockIcon={dayWeather}
          blockSubIcon={'daySpecialWeather'}
          blockDisplay={is_day_playable} 
        />
        <InfoBlock 
          blockHeader={'Night'}
          blockSubHeader={time_night}
          blockIcon={nightWeather}
          blockSubIcon={'nightSpecialWeather'} 
          blockDisplay={is_day_playable} 
        />
      </div>
      {
        infoBlockDetails.map((item, index)=>{
          return (
            <InfoBlock key={item.blockHeader+index}
              blockHeader={item.blockHeader}
              blockSubHeader={item.blockSubHeader}
              blockIcon={item.blockIcon}
              blockSubIcon={item.blockSubIcon} 
              blockInfo={item.blockInfo}
              blockStyling={item.blockStyling}
              blockDisplay={item.blockDisplay}
            />
          )
        })
      }
    </>
  )
}

