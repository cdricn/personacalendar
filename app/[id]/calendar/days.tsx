import styles from './calendar.module.css';

export default function Days({
  monthLength,
  monthStart,
  setDay
}:{
  monthLength:number,
  monthStart:number,
  setDay:(item:number)=>void
}) {

  function handleClick(currentDay:number) {
    setDay(currentDay);
  }

  function populateDays() {
    let daysArray = [];
    for(let i=0; i<monthLength; i++) {
      let dayKey = 'day' + (i+1);
      daysArray.push(
        <div className={styles['day']} 
          key={dayKey}
          onClick={()=>{handleClick(i)}}
          style={i==0?{gridColumnStart: `${monthStart}`}:undefined}>
          <span>{i+1}</span>
        </div>
      );
    }
    return daysArray;
  }

  return (
    <div className={styles['days-container']}>
      <div className={styles['day-names']}>
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>
      <div className={styles['days-grid']}>
        {populateDays()}
      </div>
    </div>
  )
}