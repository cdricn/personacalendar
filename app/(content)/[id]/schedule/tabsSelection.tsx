import styles from './tabs.module.css';

export default function TabsSelection({
  clickTab
}:{
  clickTab:(item:string)=>void
}) {

  function handleClickTab(tab:string) {
    clickTab(tab)
  }

  return (
    <div className={styles['tabs-container']}>
      <div onClick={()=>handleClickTab('info')} data-selected={'info'}>
        <span>Info</span>
      </div>
      <div onClick={()=>handleClickTab('social')} data-selected={'social'}>
        <span>Social</span>
      </div>
    </div>
  )
}