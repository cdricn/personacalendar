'use client';

import styles from './confidants.module.css';
import { GameMapping } from '@/app/utils/gameMapping';
import { GameContext } from '@/app/utils/context';
import { use } from 'react';

export default function Confidants({currentDay}:{currentDay:number}) {
  const game = use(GameContext);
  const {confidants} = GameMapping[game.slice(1)]; 


  // check if day is invalid or unavailable
  // check if confidant is manual
  // check if day for unlock has passed
  // check if raining
  return (
    <>
      {confidants.map((confidant)=>{
        if(confidant.schedule !== null && Object.hasOwn(confidant.schedule, 'currentDayName'))
          return <></>
        })
      }
    </>
  )
}