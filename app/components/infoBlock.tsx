import styles from './infoBlock.module.css';
import { InfoBlockInterface } from '../lib/interface';

export default function InfoBlock({
  blockHeader, 
  blockSubHeader, 
  blockIcon, 
  blockSubIcon, 
  blockInfo,
  blockStyling,
  blockDisplay
} : InfoBlockInterface) {

  if (!Boolean(blockDisplay)) return 

  const infoDisplay = Boolean(blockInfo);
  const blockIconElement = blockIcon &&
    <div className={styles['block-weather']}>
      <img src={blockIcon} alt={''}/>
    </div>;
  const blockSubHeaderElement = blockSubHeader && 
    <span className={styles['block-name-subtext']} data-text-color={blockSubHeader}>
      {blockSubHeader.charAt(0).toUpperCase() + blockSubHeader.slice(1)}
    </span>

  return (
    <div className={styles['block']} data-styling={blockStyling}>
      <div className={styles['block-header']}>
        <div className={styles['block-name']}>
          <h3>{blockHeader}</h3>
          {blockSubHeaderElement}
        </div>
        {blockIconElement}
      </div>
      <ul className={styles['block-info']} data-display={infoDisplay}>
        {blockInfo?.map((item, index)=> {
          return (
            <li key={item+index}>{item}</li>
          )})
        }
      </ul>
    </div>
  )
}