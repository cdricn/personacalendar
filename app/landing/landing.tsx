import Link from "next/link";
import Games from "../data/games.json" 
import styles from "./landing.module.css"

export default function Landing() {
  console.log(Games)
  return (
    <>
      <h1>Calendar</h1>
      <p>Some description about the website</p>
      <section>
        {Games.map((item, index)=>{
          return (
            <div>
              <Link href={item.link}>item.title</Link>
            </div>
          )
        })}
      </section>
    </>
  );
}
