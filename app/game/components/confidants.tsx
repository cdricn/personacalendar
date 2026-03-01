'use client';

import styles from './confidants.module.css';
import { GameMapping } from '@/app/lib/gameMapping';
import { ConfidantData } from '@/app/lib/interface';
import { GameContext, DataContext } from '@/app/utils/context';
import { use } from 'react';

export default function Confidants({currentDay}:{currentDay:number}) {
  const data = use(DataContext);
  const game = use(GameContext);
  const {confidants} = GameMapping[game.slice(1)]; 

  const monthToDigit : {[month:string]: string} = {
    april: '1',
    may: '2',
    june: '3',
    july: '4',
    august: '5',
    september: '6',
    october: '7',
    november: '8',
    december: '9',
    january: '10',
    february: '11',
    march: '12',
  };
  const dayDigitToName : {[month:string]: string} = {
    1: 'sunday',
    2: 'monday',
    3: 'tuesday',
    4: 'wednesday',
    5: 'thursday',
    6: 'friday',
    7: 'saturday',
  }


  // check if day is invalid or unavailable x
  // check if confidant has a schedule x
  // check if day for unlock has passed x
  // check if raining
  //check if === to month unlock
  //if yes, check if day > day 
  // this is ASS
  
  function checkSchedule(confidant:ConfidantData, day:number, weather: string | null) {
    if (Object.hasOwn(confidant.schedule!.availability, dayDigitToName[day])) {
      if (weather === 'rainy' && confidant.schedule!.ignoresRain) {
        return (
          <div key={confidant.arcana}>
            {confidant.name}
          </div>
        )
      } else return (
        <div key={confidant.arcana}>
          {confidant.name}
        </div>
      )
    } 
  }

  function populateConfidants() {
    if (!data) return <>Loading...</>;

    const {month, day, day_code, day_weather, night_weather, invalidDay} = data[currentDay];
    if (invalidDay) return <>Invalidddday</>;

    return confidants.map((confidant)=>{
      if (confidant.schedule !== null) {
        if (Number(monthToDigit[month]) === Number(monthToDigit[confidant.unlock.month])) {
          if (day >= confidant.unlock.day) return checkSchedule(confidant, day_code, day_weather);
        } 
        else if (Number(monthToDigit[month]) >= Number(monthToDigit[confidant.unlock.month])) {
          return checkSchedule(confidant, day_code, night_weather);
        }
      }
    })
  } 

  return (
    <>
      {populateConfidants()}
    </>
  )
}