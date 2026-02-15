import styles from './calendar.module.css';

export default function Days({monthLength}:{monthLength:number}) {

  function handleClick(day:string) {
  }

  function populateDays() {
    let daysArray = [];
    let test = 10;
    for(let i=0; i<test; i++) {
      console.log('running?', i)
      daysArray.push(
        <div>test</div>
      );
    }
    console.log(daysArray)
    return daysArray;
  }

  return (
    <div className={styles['days-container']}>
      {populateDays()}
    </div>
  )
}