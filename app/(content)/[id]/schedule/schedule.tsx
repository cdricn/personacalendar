'use client';

import styles from './schedule.module.css';
import { GameContext, DataContext } from '@/app/utils/context';
import { use } from 'react';
import { useState } from 'react';
import { ResourceMapping } from '@/app/lib/resourceMapping';
import GeneralTab from './generalTab';

export default function Schedule({currentDay, currentMonth}:{currentDay:number, currentMonth:string}) {
  const [selectedTab, setSelectedTab] = useState('general');
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
  
  return (
    <>
      <div className={styles['section-header-container']}>
        <div className={styles['section-header']}>
          <h2>{monthToDigit[currentMonth]}/{day} {dayHeaders[day_code-1]}</h2>
        </div>
      </div>

      <div className={styles['options']}>
        <div onClick={()=>setSelectedTab('general')} data-selected={selectedTab === 'general'}><span>General</span></div>
        <div onClick={()=>setSelectedTab('social')} data-selected={selectedTab === 'social'}><span>Social</span></div>
      </div>
      
      <div className={styles['schedule-container']}>
        { selectedTab === 'general' ? <GeneralTab currentDay={currentDay} /> :
          selectedTab === 'social' ? <>Social</> :
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