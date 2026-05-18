import useStateContext from "../context/useStateContext";

import Card from "./Card";

export default function Main() {
  const { activeCard, sortedCards, currentTask, viewDate, currentDate } = useStateContext();

  const getCardClass = (index) => {
    if (index === activeCard) return "card active";
    if (index === activeCard - 1) return "card prev";
    if (index === activeCard + 1) return "card next";
    return "card";
  };

  return (
    <main className="main-container">
      {sortedCards?.length > 0 ? (
        <section className="cards-container">
          {sortedCards.map((card, index) => (
            <Card
              card={card}
              index={index}
              key={card.id}
              style={getCardClass(index)}
              // color={(currentTask?.id === card.id && viewDate === currentDate) ? card.color : "#FFFFFF66"}
              color={card.color}
            />
          ))}
        </section>
      ) : (
        "No Tasks"
      )}
    </main>
  );
}
