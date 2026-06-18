import { useRef, useEffect } from "react";
import useStateContext from "../context/useStateContext";
import Button from "./Button";
import Icon from "./Icon";

export default function TodoInput({ todo, index }) {
  const { dispatch } = useStateContext();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <li className="flex-center mx-2 w-full justify-start rounded-xl pr-1 pl-2">
      <span className="dark:border-dark-theme-text/50 h-3 w-3 shrink-0 rounded-full border border-black/70"></span>
      <input
        ref={inputRef}
        autoComplete="off"
        name="todo"
        type="text"
        placeholder="To-do"
        className="dark:placeholder:text-dark-theme-text/50 dark:text-dark-theme-text my-1 w-full px-2 focus:outline-none"
        value={todo.text}
        onChange={(e) =>
          dispatch({
            type: "updateNewTaskTodos",
            payload: { text: e.target.value, done: false },
            index: index,
          })
        }
      />
      <Button type="circleXs" actionType="deleteTodo" actionPayload={index}>
        <Icon name="x" size="12" color="gray" />
      </Button>
    </li>
  );
}
