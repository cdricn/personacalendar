'use client';

import styles from "./page.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ResourcesContext, DataContext, DateContext } from "../../utils/context";
import { RawFaCalendarAlt, RawFaTableList } from "@/app/components/svgItems";
import { ResourceMapping } from "@/app/lib/resourceMapping";
import CalendarBody from "./calendar/calendarBody";
import CalendarHeader from "./calendar/calendarHeader";
import ScheduleContainer from "./schedule/scheduleContainer";
import TableContainer from "./table/tableContainer";
import useFetchData from "@/app/utils/useFetchData";

export default function CalendarPage() {
  const path = usePathname();
  const [currentMonth, setCurrentMonth] = useState('april');
  const [currentDay, setCurrentDay] = useState(0);
  const [tableView, setTableView] = useState(false);
  const gameDataValue = useFetchData(path);
  const currentDayContextValue = {currentMonth, currentDay};
  const resourcesValue = ResourceMapping[path];
  
  function clickMonth(clickedMonth:string) {
    setCurrentMonth(clickedMonth.toLowerCase());
  }
  function clickDay(clickedDay:number) {
    setCurrentDay(clickedDay);
  }
  function clickButton(clickedButton:boolean) {
    setTableView(clickedButton);
  }

  return (
    <main className={styles['main']}>
      <div>
        <div className={styles['main-header']}>
          <h1>{/*game.title*/ 'HEADER'}</h1>
          <button className={styles['layout-button']} onClick={()=>clickButton(false)}>
              <RawFaCalendarAlt />
          </button>
          <button className={styles['layout-button']} onClick={()=>clickButton(true)}>
              <RawFaTableList />
          </button>
        </div>

        <div className={styles['main-content']}>
          <DateContext value={currentDayContextValue}>
            <DataContext value={gameDataValue}>
              <ResourcesContext value={resourcesValue}>
                  <CalendarHeader clickMonth={clickMonth} />

                  <section className={styles['content-wrapper']}>
                    {tableView ?
                      <>
                        <TableContainer />
                      </> 
                      :
                      <>
                        <CalendarBody clickDay={clickDay} />
                        <ScheduleContainer />
                      </>
                    }
                  </section>
              </ResourcesContext>
            </DataContext> 
          </DateContext>
        </div>
      </div>
    </main>
  )
}