import { FaVirus } from "react-icons/fa6";
import { IoMdFlower, IoMdSnow } from "react-icons/io";
import { IoThunderstorm } from "react-icons/io5";
import { LuWaves } from "react-icons/lu";
import { GameIcons } from "./interface";
import p5confidants from '../data/p5_confidants.json'

export const GameMapping : GameIcons = {
    persona5_royal: {
      normal: {
        clear: {src: '/P5_Weather_Clear.webp', alt:'Clear weather icon'},
        cloudy: {src: '/P5_Weather_Cloudy.webp', alt:'Cloudy weather icon'},
        rainy: {src: '/P5_Weather_Rainy.webp', alt:'Rainy weather icon'},
        snowy: {src: '/P5_Weather_Snowy.webp', alt:'Snowy weather icon'},
      },
      special: {
        ['pollen']: <IoMdFlower />,
        ['heat wave']: <LuWaves />,
        ['heavy rain']: <IoThunderstorm />,
        ['flu']: <FaVirus />,
        ['cold wave']: <IoMdSnow />,
      },
      monthHeaders: [
        'april', 'may', 'june', 'july', 'august', 'september',
        'october', 'november', 'december', 'january', 'february', 'march'
      ],
      dayHeaders: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      confidants: p5confidants
    }
  }