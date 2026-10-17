import TabsSelection from "./tabsSelection";
import TabInfo from "./tabInfo";
import TabSocial from "./tabSocial";
import { ReactNode, ReactElement, useState, use } from "react";
import styles from './scheduleContainer.module.css';
import { DateContext } from "@/app/utils/context";

interface ScheduleTabs {
  [selection:string] : ReactElement<ReactNode | Promise<ReactNode>>
}

export default function ScheduleContainer() {
  
  const [selectedTab, setSelectedTab] = useState('info');
  const [layout, setLayout] = useState('calendar');
  const {currentDay, currentMonth} = use(DateContext);
  
  const currentTabDisplay : ScheduleTabs = {
    info: <TabInfo currentDay={currentDay} />,
    social: <TabSocial currentDay={currentDay} currentMonth={currentMonth}/>
  }

  function clickTab(tab:string) {
    setSelectedTab(tab)
  }

  return (
    <div className={styles['info-wrapper']}>
      <TabsSelection clickTab={clickTab}/>
      <div className={styles['info-container']}>
        {currentTabDisplay[selectedTab]}
      </div>
    </div>
  )
}