import useStateContext from "../context/useStateContext";
import Button from "./Button";
import Icon from "./Icon";

export default function TodoInput({ todo, index }) {
  const { dispatch } = useStateContext();

  return (
    <li className="flex-center mx-2 w-full justify-start rounded-xl pr-1 pl-2">
      <span className="h-3 w-3 shrink-0 rounded-full border border-black/70"></span>
      <input
        name="todo"
        type="text"
        placeholder="To-do"
        className="my-1 w-full px-2 focus:outline-none"
        value={todo}
        onChange={(e) =>
          dispatch({
            type: "updateNewTaskTodos",
            payload: e.target.value,
            index: index,
          })
        }
      />
      <Button type="circleXs" actionType="deleteTodo" actionPayload={index}>
        <Icon name="trash" size="12" color="gray" />
      </Button>
    </li>
  );
}
