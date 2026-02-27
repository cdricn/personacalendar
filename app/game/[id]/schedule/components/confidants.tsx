'use client';

import styles from './confidants.module.css'
import { GetConfidants } from '@/app/data/confidants'
import { Confidant } from '@/app/lib/interface';
import { GameContext } from '@/app/utils/context';
import { use } from 'react';

export default function Confidants({currentDay}:{currentDay:number}) {

  const gameContext = use(GameContext);
  
  if (!gameContext) return <></>
  const { priestess, empress, emperor, hierophant, lovers, chariot,
    justice, hermit, fortune, hanged_man, death, temperance, devil,
    tower, star, moon, sun, councillor
  } : Confidant = GetConfidants(gameContext);

  console.log(priestess)

  return (
    <div className={styles['info-block']}>
      <h3>Available Confidants</h3>
    </div>
  )
}