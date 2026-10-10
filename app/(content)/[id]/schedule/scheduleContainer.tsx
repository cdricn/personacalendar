import TabsSelection from "./tabsSelection";
import TabInfo from "./tabInfo";
import TabSocial from "./tabSocial";
import { ReactNode, ReactElement, useState } from "react";
import styles from './scheduleContainer.module.css';

interface ScheduleTabs {
  [selection:string] : ReactElement<ReactNode | Promise<ReactNode>>
}

export default function ScheduleContainer({
  currentDay, 
  currentMonth
}:{
  currentDay: number, 
  currentMonth: string
}) {
  
  const [selectedTab, setSelectedTab] = useState('info');
  const [layout, setLayout] = useState('calendar');
  
  const currentTabDisplay : ScheduleTabs = {
    info: <TabInfo currentDay={currentDay} />,
    social: <TabSocial currentDay={currentDay} currentMonth={currentMonth}/>
  }

  function clickTab(tab:string) {
    setSelectedTab(tab)
  }

  return (
    <>
      <TabsSelection clickTab={clickTab}/>
      <div className={styles['info-container']}>
        {currentTabDisplay[selectedTab]}
      </div>
    </>
  )
}