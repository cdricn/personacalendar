import Link from "next/link";
import Games from "./data/games.json"

export default function Main() {
  return (
    <main>
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
    </main>
  );
}
