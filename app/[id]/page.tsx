'use client';

import styles from "./page.module.css";
import useSWR from 'swr'
import getData from "../utils/getData";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Months from "./calendar/months";
import Days from "./calendar/days";

export default function CalendarPage() {
  const path = usePathname();
  const { data, error, isLoading } = useSWR(`${path}`, getData)
  const [currentMonth, setCurrentMonth] = useState('april');

  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  function setMonth(clickedMonth:string) {
    setCurrentMonth(clickedMonth);
    
  }

  console.log(data)

  return (
    <main>
      <h1>Calendar</h1>
      <Months setMonth={setMonth}/>
      {!isLoading && data !== undefined ?
        <>
          <Days monthLength={data[currentMonth].length}/>
          <div>
          </div>
        </> :
        <>err</>
      }
    </main>
  )
}