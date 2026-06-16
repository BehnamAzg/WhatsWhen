import { useEffect, useRef } from "react";

import useStateContext from "../context/useStateContext";

import Button from "./Button";
import Icon from "./Icon";

import "react-day-picker/style.css";

export default function DeletePanel() {
  const {
    dispatch,
    isDeletePanelOpen,
    selectedTask,
    selectedTaskIndex,
    removeTask,
    viewDate,
  } = useStateContext();

  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDeletePanelOpen &&
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        dispatch({ type: "toggleDeletePanel" });
      }
    };

    // Focusing on the first element after opening a panel (for tabindex accessibility)
    if (isDeletePanelOpen) {
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
  }, [isDeletePanelOpen, dispatch]);

  return (
    <div ref={componentRef} className="modal-container enter-transition">
      <h1 className="header-title">
        <span className="text-base">
          Delete Task{" "}
          <span className="text-primary">{selectedTaskIndex + 1}</span> ?
        </span>
      </h1>

      <div className="flex-center dark:text-dark-theme-text my-3 justify-start px-4">
        {selectedTask.time} - {selectedTask.title}
      </div>

      {selectedTask.recurring === 1 && (
        <div className="flex-center dark:text-dark-theme-text m-3 justify-start rounded-lg bg-red-500/70 px-4 py-2 font-medium text-white">
          This will remove all the occurrences of this "Recurring" task!
        </div>
      )}

      <div className="form-row-container mt-4 justify-end">
        <Button type="cancel" actionType="toggleDeletePanel">
          Cancel
        </Button>
        <Button
          type="delete"
          onClick={() => removeTask(selectedTask.id, viewDate)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
