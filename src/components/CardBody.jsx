import useStateContext from "../context/useStateContext";
import Icon from "./Icon";

export default function CardBody({ card }) {
  const { preferences } = useStateContext();

  const isDarkThemeAndNeutral =
    preferences.theme === "dark" && card.color === "#ffffff";

  return (
    <ul className="scrollbar-thumb-primary mt-4 mb-3 h-full min-h-0 w-full scrollbar-thin overflow-y-auto rounded-2xl bg-white/20 px-4 py-2.5 font-medium dark:bg-white/5">
      <li
        className={`mb-2 text-sm ${isDarkThemeAndNeutral ? "text-dark-theme-text" : "text-black"}`}
      >
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
            <span className={`todo-checkbox-large ${isDarkThemeAndNeutral ? "border-dark-theme-text" : "border-black"}`}>
              <Icon name="check-todo" size="12" color="none" />
            </span>
            <span className={`todo-text ${isDarkThemeAndNeutral ? "text-dark-theme-text" : "text-black"}`}>{todo.text}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
