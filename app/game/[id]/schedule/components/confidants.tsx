import styles from './confidants.module.css'

export default function Confidants({confidant_events}:{confidant_events: Array<string> | null}) {
  return (
    <>
      <h3>Confidant Events</h3>
      {confidant_events===null?null :
        
        <p></p>
      }
      <h3>Available Confidants</h3>
    </>
  )
}