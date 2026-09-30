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
  const tileIcon = item.is_day_playable;

  const dayIconColor = 
    item.time_day === 'unavailable' ? 'alert' :
    item.time_day === 'limited' ? 'warning' : null
  const nightIconColor = 
    item.time_night === 'unavailable' ? 'alert' :
    item.time_night === 'limited' ? 'warning' : null
  const numberColor = 
    item.time_day === 'unavailable' && item.time_night === 'unavailable' ? 'alert' : 
    item.time_day === 'unavailable' && item.time_night === 'limited' ? 'alert' :
    item.time_day === 'limited' && item.time_night === 'unavailable' ? 'alert' :
    null
    
  const alertIndicator = item.alert ? 'alert' : false;
  const warningIndicator = item.notice ? 'warning' : false;
  const noticeIndicator = item.missable_item || item.missable_stat ? 'notice' : false;

  return (
    <div id={item.day.toString()} className={styles['tile']}>
      <div className={styles['tile-content']} 
        data-clickable={item.is_day_playable}
        data-background={tileIcon}
        data-selected={isTileSelected}
      >
        {!item.is_day_playable ? <div className={styles['stripes']}><Stripes/></div> : null}
        <div className={styles['weather-icon-container']} data-icon-alignment={weatherAlign} >
          <span className={styles['weather-icon']} data-color={dayIconColor}>
            {item.day_weather && <img src={weather_icons[item.day_weather].src} alt={weather_icons[item.day_weather].alt} />}
          </span>
          <span className={styles['weather-icon']} data-color={nightIconColor}>
            {item.night_weather && <img src={weather_icons[item.night_weather].src} alt={weather_icons[item.night_weather].alt} />}
          </span>
        </div>
        <span className={styles['tile-number']} data-color={numberColor}>{item.day}</span>
        <div className={styles['item-indicator-container']}>
          <div className={styles['item-indicator']} data-display={alertIndicator}></div>
          <div className={styles['item-indicator']} data-display={warningIndicator}></div>
          <div className={styles['item-indicator']} data-display={noticeIndicator}></div>
        </div>
      </div>
    </div>
  )
}