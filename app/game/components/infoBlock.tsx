'use client';

import styles from './infoBlock.module.css'

export default function InfoBlock({
  header,
  content,
  content_spoiler,
  noContentMessage,
  isDayInvalid
}:{
  header: string,
  content: Array<string> | null,
  content_spoiler: Array<string> | null,
  noContentMessage: string | null,
  isDayInvalid: boolean
}) {

  function displayContent() {
    if (content) {
      return content.map((item, index)=>{
        return (
          <p key={'content'+index}>{item}</p>
        )
      })
    }
    else return <p>{isDayInvalid ? 'Not Available.' : <>{noContentMessage}</>}</p>
  }

  function displaySpoilerContent() {
    if (content && content_spoiler) {
      return (
        <details>
          <summary>Spoilers:</summary>
          {content_spoiler.map((item, index)=>{
            return (
              <li key={'contentSpoiler'+item} className={styles['events-spoiler']}>
                <p>{item}</p>
              </li>
            )
          })}
        </details>
      )
    }
    else return null
  }

  return (
    <div className={styles['info-block']}>
      <h3>{header}</h3>
      {displayContent()}
      {displaySpoilerContent()}
    </div>
  )
}