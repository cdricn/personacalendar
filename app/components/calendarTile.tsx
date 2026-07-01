import styles from './calendarTile.module.css';
import { CalendarDays } from "../lib/interface";

interface day_modifier {
  [modifier: string]: {
    src: string;
    alt: string;
  };
}

export default function calendarTile({
  item, 
  dayStart,
  day_modifier
}:{
  item: CalendarDays, 
  dayStart: object | undefined,
  day_modifier: day_modifier
}) {

  const dayStyle = item.is_day_playable ? undefined : {
      backgroundColor: 'var(--color-gray-inactive)', 
      cursor: 'auto', 
      color: 'var(--color-inactive-day)',
    };
  const weatherDayStyle = { 
    alignSelf: item.night_weather ? 'flex-start' : 'center',
    transform: item.night_weather ? 'translate(1px, 5px)' : undefined,
  };
  const weatherNightStyle = { 
    alignSelf: item.day_weather ? 'flex-end' : 'center',
    transform: item.day_weather ? 'translate(-1px, -3px)' : undefined,
  };

  function addSymbols(item:CalendarDays) {
    if (!item.is_day_playable) return;
    if ((item.day_activities === 'Unavailable') && (item.night_activities === 'Unavailable')) {
      return <img className={styles['hint-icon']} src='/symbol_unavailable.svg'/>;
    }
    else if ((item.day_activities === 'Limited') || (item.night_activities === 'Limited')) {
      return <img className={styles['hint-icon']} src='/symbol_yellow.svg'/>;
    }
    else if (item.activities || item.social_events) {
      return <img className={styles['hint-icon']} src='/symbol_blue.svg'/>;
    }
  }

  function handleClickDay(currentDay:number) {
    console.log(currentDay)
  }
  
  return (
    <div id={item.day.toString()}
      className={styles['day-container']} 
      style={dayStart}
    >
      <div className={styles['day']} style={dayStyle}>
        <div className={styles['weather-icon-container']} >
          {item.day_weather ? <img style={weatherDayStyle} src={day_modifier[item.day_weather].src} alt={day_modifier[item.day_weather].alt} /> : null}
          {item.night_weather ? <img style={weatherNightStyle} src={day_modifier[item.night_weather].src} alt={day_modifier[item.night_weather].alt} /> : null}
        </div>
        <span>{item.day}</span>
        <div className={styles['hint-icons-container']}>
          {addSymbols(item)}
        </div>
      </div>
    </div>
  )
}