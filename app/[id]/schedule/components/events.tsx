'use client';

import styles from './events.module.css'
import { useState } from 'react';

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

  const [spoiler, setSpoiler] = useState(false);

  return (
    <>
      <div className={styles['events-header']}>
        <h3>Schedule</h3>
        <div className={styles['spoiler-button']}>
          Spoiler
          <span className={styles['button']} onClick={()=>setSpoiler(!spoiler)}>
            {spoiler ?
              <span className={styles['spoiler-on']}>ON</span> :
              <span className={styles['spoiler-off']}>OFF</span>
            }
          </span>
        </div>
      </div>
      <div>
        <p>{world}</p>
        {events ? 
          <>
            <p>{events}</p>
            {events_spoiler===null ? null :
              <details style={spoiler ? undefined : {display:'none'}}>
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
    </>
  )
}