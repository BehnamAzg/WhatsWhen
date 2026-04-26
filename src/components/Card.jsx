import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

export default function Card({ card, index }) {
  return (
    <article className="card-element">
      <CardHeader card={card} index={index} />
      <CardBody card={card} />
      <CardFooter card={card} />
    </article>
  );
}
