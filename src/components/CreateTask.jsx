import { useEffect, useRef } from "react";

import useStateContext from "../context/useStateContext";

import Button from "./Button";
import ColorSelection from "./ColorSelection";
import DayRepetition from "./DayRepetition";
import Icon from "./Icon";
import Reminder from "./Reminder";

export default function CreateTask() {
  const { dispatch, isCreateTaskPanelOpen } = useStateContext();

  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCreateTaskPanelOpen && componentRef.current && !componentRef.current.contains(event.target)) {
        dispatch({ type: "toggleCreateTask" });
      }
    };

    if (isCreateTaskPanelOpen) {
      const focusableElements = componentRef.current.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
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

      <form className="create-task-form" onSubmit="">
        <div className="form-row-container">
          {/* Icon */}
          <Button type="circle">
            <Icon name="smiley" size="22" color="gray" />
          </Button>

          {/* Title */}
          <input type="text" name="title" placeholder="Title" required className="form-input" />
        </div>

        <div className="form-row-container">
          {/* Time */}
          <input type="time" name="time" required className="form-input w-1/2" />

          {/* Reminder */}
          <Reminder />
        </div>

        <div className="form-row-container">
          {/* Tag */}
          <input type="text" name="tag" placeholder="Tag" className="form-input" />
        </div>

        <DayRepetition />

        <ColorSelection />

        <div className="form-row-container">
          {/* Description */}
          <textarea name="description" rows="2" placeholder="Description" className="form-input rounded-2xl py-2.5 h-auto"></textarea>
        </div>

        <div className="form-row-container">
          <Button type="capsule">
            <Icon name="todo" />
            <span>Add To-do Item</span>
          </Button>
          <Button type="capsule">
            <Icon name="timer" />
            <span>Pomodoro Timer</span>
          </Button>
        </div>

        <div className="form-row-container mt-2 justify-end">
          <Button type="cancel" actionType="toggleCreateTask">
            Cancel
          </Button>
          <Button type="add" actionType="">
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}
