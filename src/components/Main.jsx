import { useEffect } from "react";
import useStateContext from "../context/useStateContext";

import Card from "./Card";

export default function Main() {
  const { dispatch, activeCard, sortedCards } = useStateContext();

  const getCardClass = (index) => {
    if (index === activeCard) return "card active";
    if (index === activeCard - 1) return "card prev";
    if (index === activeCard + 1) return "card next";
    return "card";
  };

  useEffect(() => {
    function handleScroll(e) {
      if (e.deltaY > 0 && activeCard < sortedCards.length - 1) {
        dispatch({ type: "goToNextCard" });
      } else if (e.deltaY < 0) {
        dispatch({ type: "goToPrevCard" });
      }
    }

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [activeCard, sortedCards, dispatch]);

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
              // color={activeCard === index ? card.color : "#FFFFFF4D"}
              color="#FFFFFF4D"
            />
          ))}
        </section>
      ) : (
        "No Tasks"
      )}
    </main>
  );
}
