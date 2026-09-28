import styles from './schedule.module.css';
import { GameContext, DataContext } from '@/app/utils/context';
import { use } from 'react';
import { useState } from 'react';
import { ResourceMapping } from '@/app/lib/resourceMapping';
import TabInfo from './tabInfo';

export default function Schedule({currentDay, currentMonth}:{currentDay:number, currentMonth:string}) {
  const [selectedTab, setSelectedTab] = useState('info');
  const game = use(GameContext);
  const data = use(DataContext);
  const currentGame = ResourceMapping[game]
  
  if (!currentGame) return;
  const {dayHeaders} = ResourceMapping[game];

  if (!data) return;
  const scheduleData = data[currentDay] ? data[currentDay] : data[data.length-1];
  const {day, day_code} = scheduleData;

  function isTabClickable(tab:string) {
    setSelectedTab(tab)
  }

  return (
    <>
      <div className={styles['section-container']}>
      </div>

      <div className={styles['options']}>
        <div onClick={()=>setSelectedTab('info')} data-selected={selectedTab === 'info'}>
          <span>Info</span>
        </div>
        <div onClick={()=>isTabClickable('story')} data-selected={selectedTab === 'story'}>
          <span>Confidants</span>
        </div>
      </div>
      
      <div className={styles['info-container']}>
        { selectedTab === 'info' ? <TabInfo currentDay={currentDay} /> :
          selectedTab === 'confidant' ? <></> :
          <></>
        }
      </div>
    </>
  )
}