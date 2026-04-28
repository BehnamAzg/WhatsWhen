import { useState } from "react";
import Card from "./Card";
import { useStateContext } from "./StateProvider";

function timeToSeconds(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 3600 + m * 60;
}

export default function Main() {
  const { cards } = useStateContext();
  const [activeCard, setActiveCard] = useState(1);

  const getCardClass = (index) => {
    if (index === activeCard) return "card active";
    if (index === activeCard - 1) return "card prev";
    if (index === activeCard + 1) return "card next";
    return "card";
  };

  const sortedCards = [...(cards || [])].sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time));

  return (
    <main className="main-container">
      {sortedCards?.length > 0 ? (
        <section className="cards-container">
          {sortedCards.map((card, index) => (
            <Card card={card} index={index} key={card.id} style={getCardClass(index)} color={activeCard === index ? card.color : "#FFFFFF66"} />
          ))}
        </section>
      ) : (
        "No Tasks"
      )}
    </main>
  );
}
