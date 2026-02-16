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
    <>
      <div className={styles['day-names']}>
        <div><span>Sun</span></div>
        <div><span>Mon</span></div>
        <div><span>Tue</span></div>
        <div><span>Wed</span></div>
        <div><span>Thu</span></div>
        <div><span>Fri</span></div>
        <div><span>Sat</span></div>
      </div>
      <div className={styles['day-container']}>
        {populateDays()}
      </div>
    </>
  )
}