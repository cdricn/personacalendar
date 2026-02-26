'use client';

import styles from './events.module.css'

export default function Events({
  invalidDay,
  world,
  events,
  events_spoiler
}:{
  invalidDay: boolean,
  world: Array<string> | null,
  events: Array<string> | null,
  events_spoiler: Array<string> | null
}) {

  return (
    <div>
      <p>{world}</p>
      {events ? 
        <>
          <p>{events}</p>
          {events_spoiler===null ? null :
            <details>
              <summary>Spoilers:</summary>
              {events_spoiler.map((item, index)=>{
                return (
                  <li key={'events_spoilerItem'+index} className={styles['events-spoiler']}>
                    <p>{item}</p>
                  </li>
                )
              })}
            </details>
          }
        </>
        : 
        <>
          {
            invalidDay ? <p>Not Available.</p> : <p>Free.</p>
          }
        </>
      }
    </div>
  )
}