'use client';

import styles from "./page.module.css";
import json_data from '../../data/p5royal_data.json'; 
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GameContext, DataContext } from "../../utils/context";
import Schedule from "./schedule/schedule";
import { CalendarMonths } from "@/app/lib/interface";
import Calendar from "@/app/components/calendar";


export default function CalendarPage() {
  const path = usePathname();
  const [currentMonth, setCurrentMonth] = useState('april');
  const [currentDay, setCurrentDay] = useState(0);
  const data : CalendarMonths = json_data;

  function setMonth(clickedMonth:string) {
    setCurrentMonth(clickedMonth);
  }

  function setDay(clickedDay:number) {
    setCurrentDay(clickedDay);
  }

  return (
    <main className={styles['main']}>
      <div className={styles['main-content']}>
        {data !== undefined ?
          <DataContext value={data[currentMonth]}>
            <GameContext value={path}>
              <section className={styles['calendar-container']}>
                <Calendar setMonth={setMonth} setDay={setDay} maxRows={6} />
              </section>
              <section className={styles['schedule-container']}>
                <Schedule currentDay={currentDay}/>
              </section>
            </GameContext>
          </DataContext>
          :
          <>Could not load calendar...</>
        }
      </div>
    </main>
  )
}