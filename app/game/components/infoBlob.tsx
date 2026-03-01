'use client';

import styles from './infoBlob.module.css'

export default function InfoBlob({
  content,
  content_spoiler,
  noContentMessage,
  isDayInvalid
}:{
  content: Array<string> | null,
  content_spoiler: Array<string> | null,
  noContentMessage: string | null,
  isDayInvalid: boolean
}) {

  function displayContent() {
    if (isDayInvalid) return <p>Not Available.</p>
    if (content) {
      return content.map((item, index)=>{
        return (
          <p key={'content'+index}>{item}</p>
        )
      })
    } 
    else return <p>{noContentMessage}</p>
  }

  function displaySpoilerContent() {
    if (content && content_spoiler) {
      return (
        <details>
          <summary>Spoilers:</summary>
          {content_spoiler.map((item, index)=>{
            return (
              <li key={'contentSpoiler'+item+index} className={styles['events-spoiler']}>
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
    <>
      {displayContent()}
      {displaySpoilerContent()}
    </>
  )
}