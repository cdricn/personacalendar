'use client';

import styles from "./page.module.css";
import json_data from '../../data/p5royal_data.json'; 
import { usePathname } from "next/navigation";
import { ReactElement, useState } from "react";
import { GameContext, DataContext } from "../../utils/context";
import { CalendarMonths } from "@/app/lib/interface";
import CalendarBody from "@/app/(content)/[id]/calendar/body/calendarBody";
import MonthSelection from "./calendar/head/monthSelection";
import DateDisplay from "./calendar/head/dateDisplay";
import TabInfo from "./schedule/tabInfo";
import TabSocial from "./schedule/tabSocial";
import TabSelection from "./schedule/tabSelection";
import { ReactNode } from "react";

interface TabSelection {
  [selection:string] : ReactElement<ReactNode | Promise<ReactNode>>
}

export default function CalendarPage() {
  const path = usePathname();
  const [currentMonth, setCurrentMonth] = useState('april');
  const [currentDay, setCurrentDay] = useState(0);
  const [selectedTab, setSelectedTab] = useState('info');
  const data : CalendarMonths = json_data;
  
  function clickMonth(clickedMonth:string) {
    setCurrentMonth(clickedMonth.toLowerCase());
  }
  function clickDay(clickedDay:number) {
    setCurrentDay(clickedDay);
  }
  function clickTab(tab:string) {
    setSelectedTab(tab)
  }

  const currentTabDisplay : TabSelection = {
    info: <TabInfo currentDay={currentDay} />,
    social: <TabSocial currentDay={currentDay} currentMonth={currentMonth}/>
  }

  return (
    <main className={styles['main']}>
      <div className={styles['main-content']}>
        <DataContext value={data[currentMonth]}>
          <GameContext value={path}>
            <section className={styles['calendar-container']}>
              <div className={styles['calendar-header-container']}>
                <MonthSelection clickMonth={clickMonth} />
                <DateDisplay currentDay={currentDay} currentMonth={currentMonth}/>
              </div>
              <CalendarBody clickDay={clickDay} />
            </section>
            <section className={styles['schedule-container']}>
              <TabSelection clickTab={clickTab}/>
              <div className={styles['info-container']}>
                {currentTabDisplay[selectedTab]}
              </div>
            </section>
          </GameContext>
        </DataContext>
      </div>
    </main>
  )
}