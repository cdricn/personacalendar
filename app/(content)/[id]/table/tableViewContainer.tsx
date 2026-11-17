import styles from './tableViewContainer.module.css';
import { use } from 'react';
import { ResourcesContext, DateContext, DataContext } from '@/app/utils/context';

export default function tableViewContainer() {
  const {weather_icons, special_day_modifier} = use(ResourcesContext);
  const {currentDay, currentMonth} = use(DateContext);
  const data = use(DataContext);

  if (!data.calendarData) return;
  const currentDate = data.calendarData[currentMonth];

  function MapInfo(item: string[] | null) {
    if (item) return item.map((item, index)=><p key={item+index}>- {item}<br/></p>)
  }

  return (
    <section className={styles['content-wrapper']}>
      <table className={styles['table']}>
        <caption>
        </caption>
        <thead className={styles['table-head']}>
          <tr className={styles['table-row']}>
            <th scope="col">Date</th>
            <th scope="col">Day</th>
            <th scope="col">Night</th>
            <th scope="col">Alerts</th>
            <th scope="col">Notice</th>
            <th scope="col">Items & Stats</th>
            <th scope="col">Confidants</th>
          </tr>
        </thead>
        <tbody className={styles['table-body']}>
          {currentDate.map((item) => {
            if (!item.is_day_playable) return;
            return (
              <tr key={item.day} className={styles['table-row']}>
                <td scope="row">{item.day}</td>
                <td scope="row">
                  <div className={styles['col-weather']}>
                    <div className={styles['weather-icon-container']}>
                      {item.day_weather && <img src={weather_icons[item.day_weather].src} alt={weather_icons[item.day_weather].alt} />}
                    </div>
                  </div>
                </td>
                <td scope="row">
                  <div className={styles['col-weather']}>
                    <div className={styles['weather-icon-container']}>
                      {item.night_weather && <img src={weather_icons[item.night_weather].src} alt={weather_icons[item.night_weather].alt} />}
                    </div>
                  </div>
                </td>
                <td scope="row">
                  <div className={styles['col-info']}>
                    {MapInfo(item.alert)}
                  </div>
                </td>
                <td scope="row">
                  <div className={styles['col-info']}>
                    {MapInfo(item.notice)}
                  </div>
                </td>
                <td scope="row">
                  <div className={styles['col-info']}>
                    {MapInfo(item.missable_item)}
                    {MapInfo(item.missable_stat)}
                  </div>
                </td>
                <td scope="row">
                  <div className={styles['col-info']}>
                    confidants
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}