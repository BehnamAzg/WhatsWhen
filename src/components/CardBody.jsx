import Icon from "./Icon";

export default function CardBody({ card }) {
  return (
    <ul className="mt-4 mb-3 h-full min-h-0 w-full overflow-y-auto rounded-2xl bg-white/20 px-4 py-2.5 font-medium">
      <li className="mb-2 text-sm">
        <p>{card.description}</p>
      </li>
      {card.todos.map((todo, index) => (
        <li className="" key={index}>
          <label className="inline-flex cursor-pointer items-start justify-start gap-x-2">
            <input
              type="checkbox"
              className="peer hidden"
              defaultChecked={todo.done}
            />
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
