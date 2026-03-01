'use client';

import styles from "./page.module.css";
import useSWR from 'swr';
import getData from "../../utils/getData";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GameContext, DataContext } from "../../utils/context";
import Months from "../components/months";
import Days from "../components/days";
import Schedule from "./schedule/schedule";

export default function CalendarPage() {
  const path = usePathname();
  const swrPath = path.slice(5);
  const { data, error, isLoading } = useSWR(`${swrPath}`, getData);
  const [currentMonth, setCurrentMonth] = useState('april');
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(()=>{
    // Set data theme
    const theme = swrPath.slice(1);
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
          <DataContext value={data[currentMonth]}>
            <GameContext value={path.slice(5)}>
              <section className={styles['calendar-container']}>
                <Months setMonth={setMonth}/>
                <Days setDay={setDay} maxRows={6}/>
              </section>
              <section className={styles['schedule-container']}>
                  <Schedule currentDay={currentDay}/>
              </section>
            </GameContext>
          </DataContext>
          :
          <>HELLLOOO</>
        }
      </div>
    </main>
  )
}