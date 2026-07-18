import styles from './activitiesBlock.module.css';
import { Stripes } from '@/app/components/svgItems';

interface Block {
  blockTitle: string,
  weather: string | null;
  specialDayWeather: string | null,
  world: string | string[] | null,
  activities: string | string[] | null,
  socialEvents: string | string[] | null,
  events: string | string[] | null,
  eventsSpoiler: string | string[] | null,
  dayAvailability: string | null,
  isDayPlayable: boolean
}

export default function ActivitiesBlock({
  blockTitle,
  weather,
  specialDayWeather,
  world,
  activities,
  socialEvents,
  events,
  eventsSpoiler,
  dayAvailability,
  isDayPlayable
} : Block 
) {

  const statusColor = !dayAvailability ? undefined :
    dayAvailability === 'Unavailable' ? 'unavailable' : 
    dayAvailability === 'Limited' ? 'limited' :
    'free';
  const infoDisplay = !isDayPlayable || dayAvailability === 'Unavailable';

  return (
    <div className={styles['activities-block']}>

      <div className={styles['block-header']}>
        <div className={styles['header-status']}>
          <span data-display={isDayPlayable} data-status-color={statusColor}/>
          <h3>{blockTitle}</h3>
        </div>
        <span>{dayAvailability}</span>
      </div>

      <div className={styles['block-info-container']}>
        <div className={styles['block-info']} data-display={infoDisplay}>
          <span data-display={specialDayWeather ? true : false}>
            Modifier: <span> {specialDayWeather}</span>
          </span>
          <div className={styles['info']}>
            <h4>Socials</h4>
          </div>
          <div className={styles['info']}>
            <h4>World</h4>
          </div>
          <div className={styles['info']}>
            <h4>Activities</h4>
          </div>
        </div>
        <div className={styles['block-info-filler']} data-display={infoDisplay}>
        </div>
      </div>
    </div>
  )
}