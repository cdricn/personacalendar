'use client';

import styles from './weather.module.css';
import { GameContext } from '@/app/utils/context';
import { use } from 'react';
import { FaVirus } from "react-icons/fa6";

export default function Weather({
  iconName, special_iconName
}:{
  iconName: string | null, 
  special_iconName: string | null
}) {

  const game = use(GameContext);
  const iconMap = {
    persona5_royal: {
      normal: {
        clear: {src: './P5_Weather_Clear.webp', alt:''},
        cloudy: {src: './P5_Weather_Cloudy.webp', alt:''},
        rainy: {src: './P5_Weather_Rainy.webp', alt:''},
        snowy: {src: '', alt:''},
      },
      special: {
        ['pollen']: <FaVirus />,
      }
    }
  }
  
  return (
    <div className={styles['icon-container']}>
      {
        iconName !== null ? 
          <img className={styles['icon']} 
            src={iconMap[game].normal[iconName].src} 
            alt={iconMap[game].normal[iconName].alt} /> : null
      }
      {
        special_iconName !== null ? 
          <div>{iconMap[game].special[special_iconName]}</div> : null
      }
    </div>
  )
}
