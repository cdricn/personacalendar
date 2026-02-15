import Link from "next/link";
import Games from "../data/games.json" 
import styles from "./landing.module.css"

export default function Landing() {
  return (
    <>
      <h1>Calendar</h1>
      <p>Some description about the website</p>
      <section>
        {Games.map((item)=>{
          return (
            <div key={item.id}>
              <Link href={item.link}>{item.link}</Link>
            </div>
          )
        })}
      </section>
    </>
  );
}
