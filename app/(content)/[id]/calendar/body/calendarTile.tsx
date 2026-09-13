import styles from './calendarTile.module.css';
import { Image, CalendarDays } from "../../../../lib/interface";
import { Stripes } from '../../../../components/svgItems';

export default function calendarTile({
  item, 
  weather_icons,
  isSelected,
  general_icons
}:{
  item: CalendarDays, 
  weather_icons: Image,
  isSelected: number | null,
  general_icons: Image
}) {

  const isTileSelected = isSelected === item.day;
  const hasNotice = item.notice ? 'hasNotice' : null;

  const tileColor = !item.is_day_playable ? undefined :
    item.notice ? 'alert' : 
    // item.notice ? 'notice' - narrow notice further
    item.social_events ? 'event' : 
    'normal';

  function addTileIcon(time: string | null, image_type: string | null) {
    if (time === 'unavailable') {
      return <img className={styles['unavailable_icon']} src={general_icons.unavailable.src} alt={general_icons.unavailable.alt} />;
    } 
    else if (time === 'limited') {
      return <img className={styles['limited_icon']} src={general_icons.limited.src} alt={general_icons.limited.alt} />;
    } 
    else if (image_type) {
      return <img src={weather_icons[image_type].src} alt={weather_icons[image_type].alt} />;
    }
    else return null;
  }

  return (
    <div id={item.day.toString()} className={styles['tile']}>
      <div className={styles['tile-content']} 
        data-clickable={item.is_day_playable}
        data-background={tileColor}
        data-selected={isTileSelected}
        data-hasNotice={hasNotice}
      >
        {!item.is_day_playable ? <div className={styles['stripes']}><Stripes/></div> : null}
        <div className={styles['weather-icon-container']} >
          {addTileIcon(item.time_day, item.day_weather)}
          {addTileIcon(item.time_night, item.night_weather)}
        </div>
        <span>{item.day}</span>
      </div>
    </div>
  )
}