'use client';

import styles from './weather.module.css';
import { GameContext } from '@/app/utils/context';
import { use } from 'react';
import { IconContext } from 'react-icons';
import { FaCloudSun } from "react-icons/fa";
import { FaVirus, FaSun, FaMoon } from "react-icons/fa6";
import { IoMdFlower, IoMdSnow } from "react-icons/io";
import { IoThunderstorm } from "react-icons/io5";
import { LuWaves } from "react-icons/lu";

export default function Weather({
  time, iconName, special_iconName
}:{
  time: string, 
  iconName: string | null, 
  special_iconName: string | null
}) {

  const game = use(GameContext);
  const iconMap = {
    persona5_royal: {
      normal: {
        clear: {src: './P5_Weather_Clear.webp', alt:'Clear weather icon'},
        cloudy: {src: './P5_Weather_Cloudy.webp', alt:'Cloudy weather icon'},
        rainy: {src: './P5_Weather_Rainy.webp', alt:'Rainy weather icon'},
        snowy: {src: './P5_Weather_Snowy.webp', alt:'Snowy weather icon'},
      },
      special: {
        ['pollen']: <IoMdFlower />,
        ['heat wave']: <LuWaves />,
        ['heavy rain']: <IoThunderstorm />,
        ['flu']: <FaVirus />,
        ['cold wave']: <IoMdSnow />,
      }
    }
  }
  
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
