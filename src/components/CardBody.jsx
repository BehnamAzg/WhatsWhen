import Icon from "./Icon";

export default function CardBody({ card }) {
  return (
    <ul className="w-full h-full px-4 py-2.5 min-h-0 rounded-2xl bg-white/20 mt-4 mb-3 overflow-y-auto font-medium">
      <li className="mb-2 text-sm">
        <p>{card.description}</p>
      </li>
      {card.todos.map((todo, index) => (
        <li className="" key={index}>
          <label className="cursor-pointer inline-flex gap-x-2 items-start justify-start">
            <input type="checkbox" className="hidden peer" defaultChecked={todo.done} />
            <span className="todo-checkbox-large">
              <Icon name="check-todo" size="12" color="none" />
            </span>
            <span className="todo-text">{todo.text}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
