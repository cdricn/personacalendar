import styles from './infoBlock.module.css'

interface InfoBlock {
  blockHeader: string;
  blockSubHeader?: string | null;
  blockIcon?: string | null;
  blockSubIcon?: string | null;
  blockInfo?: string[] | null;
  blockStyling?: string;
  blockDisplay?: boolean;
}

export default function InfoBlock({
  blockHeader, 
  blockSubHeader, 
  blockIcon, 
  blockSubIcon, 
  blockInfo,
  blockStyling,
  blockDisplay
} : InfoBlock) {

    const infoDisplay = Boolean(blockInfo);
    return (
      <div className={styles['block']} data-styling={blockStyling} data-display={blockDisplay}>
        <div className={styles['block-header']}>
          <div className={styles['block-name']}>
            <h3>{blockHeader}</h3>
            <span className={styles['block-name-subtext']} data-text-color={blockSubHeader}>
              {blockSubHeader && blockSubHeader.charAt(0).toUpperCase() + blockSubHeader.slice(1)}
            </span>
          </div>
          <div className={styles['block-weather']}>
            {blockIcon && <img src={blockIcon} alt={''}/>}
          </div>
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