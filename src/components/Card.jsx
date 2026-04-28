import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";


export default function Card({ card, index, style, color }) {
  return (
    <article className={`card-element ${style}`} style={{backgroundColor: color}}>
      <CardHeader card={card} index={index} />
      <CardBody card={card} />
      <CardFooter card={card} />
    </article>
  );
}
