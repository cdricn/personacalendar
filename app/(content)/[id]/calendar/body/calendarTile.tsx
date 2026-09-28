import styles from './calendarTile.module.css';
import { Image, CalendarDays } from "../../../../lib/interface";
import { Stripes } from '../../../../components/svgItems';

export default function calendarTile({
  item, 
  weather_icons,
  isSelected
}:{
  item: CalendarDays, 
  weather_icons: Image,
  isSelected: number | null
}) {

  const isTileSelected = isSelected === item.day;
  const weatherAlign = item.day_weather && item.night_weather ? "double" : "center";
  const tileColor = !item.is_day_playable ? undefined :
    (item.time_day === 'unavailable' && item.time_night === 'unavailable') || item.alert ? 'alert' : 
    item.notice ? 'warning' :
    item.social_events ? 'event' : 
    'normal';
  const itemIndicator = Boolean(item.missable_item) || Boolean(item.missable_stat);

  return (
    <div id={item.day.toString()} className={styles['tile']}>
      <div className={styles['tile-content']} 
        data-clickable={item.is_day_playable}
        data-background={tileColor}
        data-selected={isTileSelected}
      >
        {!item.is_day_playable ? <div className={styles['stripes']}><Stripes/></div> : null}
        <div className={styles['weather-icon-container']} data-icon-alignment={weatherAlign} >
          {item.day_weather && <img src={weather_icons[item.day_weather].src} alt={weather_icons[item.day_weather].alt} />}
          {item.night_weather && <img src={weather_icons[item.night_weather].src} alt={weather_icons[item.night_weather].alt} />}
        </div>
        <span>{item.day}</span>
      </div>
      <div className={styles['item-indicator']} data-display={itemIndicator}></div>
    </div>
  )
}