import { useState } from "react";
import Card from "./Card";

function timeToSeconds(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 3600 + m * 60;
}

export default function Main({ cards }) {
  const [activeCard, setActiveCard] = useState(0);

  const sortedCards = cards?.sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time));

  return (
    <main className="main-container">
      {sortedCards ? (
        <section className="cards-container">
          {sortedCards.map((card, index) => (
            <Card card={card} index={index} key={card.id} />
          ))}
        </section>
      ) : (
        "No Tasks"
      )}
    </main>
  );
}
