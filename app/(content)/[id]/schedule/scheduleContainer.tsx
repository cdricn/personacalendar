import styles from './scheduleContainer.module.css';
import ScheduleInfoBlock from './scheduleInfoBlock.tsx';
import { ReactNode, ReactElement, use } from "react";

interface ScheduleTabs {
  [selection:string] : ReactElement<ReactNode | Promise<ReactNode>>
}

export default function ScheduleContainer() {

  return (
    <div className={styles['info-wrapper']}>
      <div className={styles['info-header']}>
        <h2>Schedule</h2>
        <span></span>
      </div>
      <div className={styles['info-container']}>
        <ScheduleInfoBlock />
      </div>
      <div className={styles['info-header']}>
        <h2>Social</h2>
        <span></span>
      </div>
      <div className={styles['info-container']}>
        ConfidantsBlock
      </div>
    </div>
  )
}