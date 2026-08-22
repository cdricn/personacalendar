'use client';

import styles from './schedule.module.css';
import { GameContext, DataContext } from '@/app/utils/context';
import { use } from 'react';
import { useState } from 'react';
import { ResourceMapping } from '@/app/lib/resourceMapping';
import InfoTab from './infoTab';
import StoryTab from './storyTab';

export default function Schedule({currentDay, currentMonth}:{currentDay:number, currentMonth:string}) {
  const [selectedTab, setSelectedTab] = useState('info');
  const game = use(GameContext);
  const data = use(DataContext);
  if (!data) return;

  const {dayHeaders} = ResourceMapping[game];
  const scheduleData = data[currentDay] ? data[currentDay] : data[data.length-1];
  const {day, day_code} = scheduleData;

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
          <span>Story</span>
        </div>
      </div>
      
      <div className={styles['info-container']}>
        { selectedTab === 'info' ? <InfoTab currentDay={currentDay} /> :
          selectedTab === 'story' ? <StoryTab currentDay={currentDay} /> :
          <></>
        }
      </div>
    </>
  )
}


/*
schedule window
| general tab
| social tab
| activities tab
*/