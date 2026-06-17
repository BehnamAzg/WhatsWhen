import useStateContext from "../context/useStateContext";

import Card from "./Card";
import Loading from "./Loading";
import NoTasks from "./NoTasks";

export default function Main() {
  const {
    activeCard,
    sortedCards,
    isLoading,
    handleTouchStart,
    handleTouchEnd,
  } = useStateContext();

  const getCardClass = (index) => {
    if (index === activeCard) return "card active";
    if (index === activeCard - 1) return "card prev";
    if (index === activeCard + 1) return "card next";
    return "card";
  };

  return (
    <main
      className="main-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {isLoading && <Loading />}
      {sortedCards?.length > 0 ? (
        <section className="cards-container">
          {sortedCards.map((card, index) => (
            <Card
              card={card}
              index={index}
              key={card.id}
              style={getCardClass(index)}
              color={card.color + "66"}
            />
          ))}
        </section>
      ) : (
        <NoTasks />
      )}
    </main>
  );
}
