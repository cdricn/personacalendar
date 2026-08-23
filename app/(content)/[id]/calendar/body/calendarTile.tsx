import styles from './calendarTile.module.css';
import { CalendarDays } from "../../../../lib/interface";
import { Stripes } from '../../../../components/svgItems';

interface day_modifier {
  [modifier: string]: {
    src: string;
    alt: string;
  };
}

export default function calendarTile({
  item, 
  day_modifier,
  isSelected
}:{
  item: CalendarDays, 
  day_modifier: day_modifier,
  isSelected: number | null
}) {

  const isTileSelected = isSelected === item.day;
  const weatherAlign = item.day_weather && item.night_weather ? 'double' : 'single';
  const tileColor = !item.is_day_playable ? undefined :
    item.day_restriction === 'Unavailable' && item.night_restriction === 'Unavailable' ? 'alert' : 
    item.day_restriction === 'Limited' || item.night_restriction === 'Limited' ? 'warning' :
    item.activities || item.social_events ? 'event' : 
    'normal';

  return (
    <div id={item.day.toString()} className={styles['day-tile-container']}>
      <div className={styles['tile']} 
        data-clickable={item.is_day_playable}
        data-background={tileColor}
        data-selected={isTileSelected}
      >
        {!item.is_day_playable ? <div className={styles['stripes']}><Stripes/></div> : null}
        <div className={styles['weather-icon-container']} data-icon-alignment={weatherAlign}>
          {item.day_weather ? <img src={day_modifier[item.day_weather].src} alt={day_modifier[item.day_weather].alt} /> : null}
          {item.night_weather ? <img src={day_modifier[item.night_weather].src} alt={day_modifier[item.night_weather].alt} /> : null}
        </div>
        <span>{item.day}</span>
      </div>
    </div>
  )
}