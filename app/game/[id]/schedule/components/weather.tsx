'use client';

import styles from './weather.module.css';
import { GameContext } from '@/app/utils/context';
import { use } from 'react';
import { iconMap } from '@/app/lib/iconMap';
import { FaSun, FaMoon } from "react-icons/fa6";

export default function Weather({
  time, iconName, special_iconName
}:{
  time: string, 
  iconName: string | null, 
  special_iconName: string | null
}) {
  const game = use(GameContext);
  
  return (
    <div className={styles['icon-container']}>
      <div className={styles['icon-time']}>
        {time==='day' ? <FaSun /> : <FaMoon />}
      </div>
      <div className={styles['icon-weather']}>
        {iconName === null ? null :
          <img className={styles['normal-icon']} 
            src={iconMap[game].normal[iconName].src} 
            alt={iconMap[game].normal[iconName].alt} 
          />
        }
        {special_iconName === null ? null :
          <div className={styles['special-icon']}>
            {iconMap[game].special[special_iconName]}
          </div>
        }
      </div>
    </div>
  )
}
