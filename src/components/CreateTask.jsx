import { useEffect, useRef, useState } from "react";

import useStateContext from "../context/useStateContext";

import Button from "./Button";
import ColorSelection from "./ColorSelection";
import DayRepetition from "./DayRepetition";
import Icon from "./Icon";
import Reminder from "./Reminder";
import PomodoroTimerCreate from "./PomodoroTimerCreate";

export default function CreateTask() {
  const { dispatch, isCreateTaskPanelOpen } = useStateContext();

  const [newTask, setNewTask] = useState({
    id: crypto.randomUUID(),
    time: "",
    title: "",
    icon: "",
    description: "",
    color: "",
    tag: "",
    reminder: false,
    repeat: [],
    todos: [],
    pomodoroTimer: false,
  });

  const componentRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(newTask);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
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
  }, [isCreateTaskPanelOpen, dispatch]);

  return (
    <div ref={componentRef} className="modal-container enter-transition">
      <h1 className="header-title">
        <Button type="close" dispatch={dispatch} actionType="toggleCreateTask">
          <Icon name="x" color="white" />
        </Button>
        <span className="text-base">Create a New Task</span>
      </h1>

      <form className="create-task-form">
        <div className="form-row-container">
          {/* Icon */}
          <Button type="circle">
            {newTask.icon ? (
              newTask.icon
            ) : (
              <Icon name="smiley" size="22" color="gray" />
            )}
          </Button>

          {/* Title */}
          <input
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            type="text"
            name="title"
            placeholder="Title"
            required
            className="form-input"
          />
        </div>

        <div className="form-row-container">
          {/* Time */}
          <input
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            type="time"
            name="time"
            required
            className="form-input w-1/2"
          />

          {/* Reminder */}
          <Reminder newTask={newTask} setNewTask={setNewTask} />
        </div>

        <div className="form-row-container">
          {/* Tag */}
          <input
            value={newTask.tag}
            onChange={(e) => setNewTask({ ...newTask, tag: e.target.value })}
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
              setNewTask({ ...newTask, description: e.target.value })
            }
            name="description"
            rows="3"
            placeholder="Description"
            className="bg-background focus-primary h-auto w-full rounded-2xl border border-white px-4 py-2.5"
          ></textarea>
        </div>

        <div className="form-row-container">
          <Button type="capsule" width="full">
            <Icon name="todo" />
            <span>Add To-do Item</span>
          </Button>
          <Button type="capsule" width="full">
            <Icon name="timer" />
            <span>Pomodoro Timer</span>
          </Button>
        </div>

        <PomodoroTimerCreate />

        <div className="form-row-container mt-2 justify-end">
          <Button type="cancel" actionType="toggleCreateTask">
            Cancel
          </Button>
          <button onClick={handleSubmit}>test</button>
          <Button type="add" actionType="createNewTask">
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}
