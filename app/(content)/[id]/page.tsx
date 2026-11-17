'use client';

import styles from "./page.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ResourcesContext, DataContext, DateContext } from "../../utils/context";
import { RawFaCalendarAlt, RawFaTableList } from "@/app/components/svgItems";
import { ResourceMapping } from "@/app/lib/resourceMapping";
import CalendarViewContainer from "./calendar/calendarViewContainer";
import CalendarHeader from "./calendar/calendarHeader";
import TableViewContainer from "./table/tableViewContainer";
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
          <button className={styles['layout-button']} data-active={!tableView} onClick={()=>clickButton(false)}>
              <RawFaCalendarAlt />
          </button>
          <button className={styles['layout-button']} data-active={tableView} onClick={()=>clickButton(true)}>
              <RawFaTableList />
          </button>
        </div>

        <div className={styles['main-content']}>
          <DateContext value={currentDayContextValue}>
            <DataContext value={gameDataValue}>
              <ResourcesContext value={resourcesValue}>
                <CalendarHeader clickMonth={clickMonth} view={tableView}/>
                {tableView ?
                  <TableViewContainer />
                  :
                  <CalendarViewContainer clickDay={clickDay} />
                }
              </ResourcesContext>
            </DataContext> 
          </DateContext>
        </div>
      </div>
    </main>
  )
}