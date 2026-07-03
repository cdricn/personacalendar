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
  day_modifier,
  isSelected
}:{
  item: CalendarDays, 
  dayStart: object | undefined,
  day_modifier: day_modifier,
  isSelected: number | null
}) {

  const weatherDayStyle = { 
    alignSelf: item.night_weather ? 'flex-start' : 'center',
    transform: item.night_weather ? 'translate(1px, 5px)' : undefined,
  };
  const weatherNightStyle = { 
    alignSelf: item.day_weather ? 'flex-end' : 'center',
    transform: item.day_weather ? 'translate(-1px, -3px)' : undefined,
  };
  const weatherContainerOpacity = {opacity: '1'}

  function selectedStyle() {
    if (!item.is_day_playable) {
      return {
        backgroundColor: 'var(--color-gray-inactive)', 
        cursor: 'auto', 
        color: 'var(--color-inactive-day)'
      }
    }
    else if (item.is_day_playable && isSelected === item.day) {
      return { backgroundColor: 'var(--color-gray-hover)' }
      // remove symbols in calendar, instead color the tile 
      // with its respective symbol color.
      // insert check logic here, and remove addSymbol function
      // to add hover, just add filter: brightness in the inserted style/module
      // and increase value when selected/hovered.
    };
  }


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

  return (
    <div id={item.day.toString()}
      className={styles['day-container']} 
      style={dayStart}
    >
      <div className={styles['day']} style={selectedStyle()}>
        <div className={styles['weather-icon-container']} style={isSelected === item.day ? weatherContainerOpacity : undefined} >
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