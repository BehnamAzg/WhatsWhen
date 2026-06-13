import { useEffect, useRef } from "react";

import useStateContext from "../context/useStateContext";

import Button from "./Button";
import ColorSelection from "./ColorSelection";
import DayRepetition from "./DayRepetition";
import Icon from "./Icon";
import Reminder from "./Reminder";
import PomodoroTimerCreate from "./PomodoroTimerCreate";
import TodoInput from "./TodoInput";

export default function CreateTask() {
  const {
    dispatch,
    isCreateTaskPanelOpen,
    isEmojiPanelOpen,
    isPomodoroActive,
    isTodoItemActive,
    newTask,
  } = useStateContext();

  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isEmojiPanelOpen) return;
      if (
        isCreateTaskPanelOpen &&
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        dispatch({ type: "toggleCreateTask" });
      }
    };

    if (isCreateTaskPanelOpen) {
      const focusableElements = componentRef.current.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        // Fallback
        componentRef.current.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCreateTaskPanelOpen, dispatch, isEmojiPanelOpen]);

  return (
    <div
      ref={componentRef}
      className="modal-container enter-transition scrollbar-none"
      style={{ background: newTask.color }}
    >
      <h1 className="header-title">
        <Button type="close" actionType="toggleCreateTask">
          <Icon name="x" color="white" />
        </Button>
        <span className="text-base">Create a New Task</span>
      </h1>

      <form className="create-task-form">
        <div className="form-row-container">
          {/* Icon */}
          <Button type="circle" actionType="toggleEmoji">
            {newTask.icon ? (
              <span className="flex-center w-full h-full text-lg">{newTask.icon}</span>
            ) : (
              <Icon name="smiley" size="22" color="gray" />
            )}
          </Button>

          {/* Title */}
          <input
            value={newTask.title}
            onChange={(e) =>
              dispatch({ type: "updateNewTaskTitle", payload: e.target.value })
            }
            type="text"
            name="title"
            placeholder="Title"
            className="form-input"
          />
        </div>

        <div className="form-row-container">
          {/* Time */}
          <input
            value={newTask.time}
            onChange={(e) =>
              dispatch({ type: "updateNewTaskTime", payload: e.target.value })
            }
            type="time"
            name="time"
            className="form-input w-1/2"
          />

          {/* Reminder */}
          <Reminder />
        </div>

        <div className="form-row-container">
          {/* Tag */}
          <input
            value={newTask.tag}
            onChange={(e) =>
              dispatch({ type: "updateNewTaskTag", payload: e.target.value })
            }
            type="text"
            name="tag"
            placeholder="Tag"
            className="form-input"
          />
        </div>

        <DayRepetition />

        <ColorSelection />

        <div className="form-row-container">
          {/* Description */}
          <textarea
            value={newTask.description}
            onChange={(e) =>
              dispatch({
                type: "updateNewTaskDescription",
                payload: e.target.value,
              })
            }
            name="description"
            rows="2"
            placeholder="Description"
            className="bg-background focus-primary h-auto w-full rounded-2xl border border-white px-4 py-2.5"
          ></textarea>
        </div>

        {/* Todo */}
        {isTodoItemActive && (
          <ul className="flex-center h-full w-full flex-col gap-1.5 rounded-2xl border border-white bg-white/20 p-2">
            {newTask.todos.map((todo, index) => (
              <TodoInput todo={todo} index={index} key={index} />
            ))}
          </ul>
        )}

        <div className="form-row-container">
          <Button type="capsule" width="full" actionType="togglePomodoro">
            <Icon name="timer" />
            <span>Pomodoro Timer</span>
          </Button>
          <Button type="capsule" width="full" actionType="addTodo">
            <Icon name="todo" />
            <span>Add To-do Item</span>
          </Button>
          
        </div>

        {/* Pomodoro */}
        {isPomodoroActive && <PomodoroTimerCreate />}

        <div className="form-row-container mt-2 justify-end">
          <Button type="cancel" actionType="toggleCreateTask">
            Cancel
          </Button>
          <Button type="add" actionType="createNewTask">
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}
