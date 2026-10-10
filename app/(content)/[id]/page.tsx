'use client';

import styles from "./page.module.css";
import json_data from '../../data/p5royal_data.json'; 
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GameContext, DataContext } from "../../utils/context";
import { CalendarMonths } from "@/app/lib/interface";
import { ResourceMapping } from "@/app/lib/resourceMapping";
import { RawFaCalendarAlt, RawFaTableList } from "@/app/components/svgItems";
import CalendarBody from "@/app/(content)/[id]/calendar/body/calendarBody";
import CalendarHeader from "./calendar/head/calendarHeader";
import ScheduleContainer from "./schedule/scheduleContainer";


export default function CalendarPage() {
  const path = usePathname();
  const game = ResourceMapping[path];
  const [currentMonth, setCurrentMonth] = useState('april');
  const [currentDay, setCurrentDay] = useState(0);
  const data : CalendarMonths = json_data;
  
  function clickMonth(clickedMonth:string) {
    setCurrentMonth(clickedMonth.toLowerCase());
  }
  function clickDay(clickedDay:number) {
    setCurrentDay(clickedDay);
  }

  return (
    <main className={styles['main']}>
      <div className={styles['wrapper']}>
        <div className={styles['main-header']}>
          <h1>{/*game.title*/ 'HEADER'}</h1>
          <button className={styles['layout-button']} tabIndex={1}><RawFaCalendarAlt /></button>
          <button className={styles['layout-button']} tabIndex={1}><RawFaTableList /></button>
        </div>
        <div className={styles['main-content']}>
          <GameContext value={path}>
            <DataContext value={data[currentMonth]}>

              <section className={styles['calendar-container']}>
                <CalendarHeader 
                  currentDay={currentDay} 
                  currentMonth={currentMonth} 
                  clickMonth={clickMonth} 
                />
                <CalendarBody clickDay={clickDay} />
              </section>

              <section className={styles['schedule-container']}>
                <ScheduleContainer currentDay={currentDay} currentMonth={currentMonth}/>
              </section>
              
            </DataContext>
          </GameContext>
        </div>
      </div>
    </main>
  )
}