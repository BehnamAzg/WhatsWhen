export default function CardBody({card}) {
  return (
    <ul
      className="w-full h-full px-4 py-2.5 min-h-0 rounded-2xl bg-white/20 my-4 overflow-y-auto font-medium"
      data-card-todo>
      <li className="mb-2">
        <p>{card.description}</p>
      </li>
      
    </ul>
  );
}
