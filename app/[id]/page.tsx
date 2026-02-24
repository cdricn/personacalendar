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
    const theme = path.slice(1);
    document.querySelector('body')?.setAttribute('data-theme', theme);
    return () => {
      document.body.removeAttribute('data-theme');
    }
  }, [])

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
        <section className={styles['main-content']}>
          {!isLoading && data !== undefined ?
            <>
              <div className={styles['calendar-container']}>
                <Months setMonth={setMonth}/>
                <Days setDay={setDay} data={data[currentMonth]}/>
              </div>
              <div className={styles['schedule-container']}>
                <GameContext value={path.slice(1)}>
                  <Schedule scheduleData={data[currentMonth][currentDay]}/>
                </GameContext>
              </div>
            </>
            :
            <>err</>
          }
        </section>
      </main>
  )
}