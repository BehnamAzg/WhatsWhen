import Icon from "./Icon";

export default function CardBody({ card }) {
  return (
    <ul className="w-full h-full px-4 py-2.5 min-h-0 rounded-2xl bg-white/20 my-4 overflow-y-auto font-medium">
      <li className="mb-2">
        <p>{card.description}</p>
      </li>
      {card.todos.map((todo) => (
        <li className="mb-1">
          <label className="cursor-pointer inline-flex gap-2 items-start">
            <input type="checkbox" className="hidden peer" checked={todo.done} />
            <span className="todo-checkbox-large">
              <Icon name="check-todo" size="12" />
            </span>
            <span className="todo-text">{todo.text}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
