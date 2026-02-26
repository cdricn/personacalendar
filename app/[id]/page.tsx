'use client';

import styles from "./page.module.css";
import useSWR from 'swr';
import getData from "../utils/getData";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GameContext } from "../utils/context";
import Months from "./calendar/months";
import Days from "./calendar/days";
import Schedule from "./schedule/schedule";

export default function CalendarPage() {
  const path = usePathname();
  const { data, error, isLoading } = useSWR(`${path}`, getData);
  const [currentMonth, setCurrentMonth] = useState('april');
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(()=>{
    // Set data theme
    const theme = path.slice(1);
    document.querySelector('body')?.setAttribute('data-theme', theme);

    // Make sure we start on a non-empty day
    if (data) {
      for(let i=0; i<data[currentMonth].length; i++){
        if(data[currentMonth][i].day_activities !== null) {
          setCurrentDay(data[currentMonth][i-1].day);
          break;
        }
      }
    }

    return () => {
      document.body.removeAttribute('data-theme');
    }
  }, [data])

  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  

  function setMonth(clickedMonth:string) {
    setCurrentMonth(clickedMonth);
  }

  function setDay(clickedDay:number) {
    setCurrentDay(clickedDay);
  }

  return (
      <main className={styles['main']}>
        <div className={styles['main-content']}>
          {!isLoading && data !== undefined ?
            <>
              <section className={styles['calendar-container']}>
                <Months setMonth={setMonth}/>
                <Days setDay={setDay} data={data[currentMonth]}/>
              </section>
              <section className={styles['schedule-container']}>
                <GameContext value={path.slice(1)}>
                  <Schedule scheduleData={data[currentMonth][currentDay]}/>
                </GameContext>
              </section>
            </>
            :
            <>err</>
          }
        </div>
      </main>
  )
}