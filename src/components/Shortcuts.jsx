import { useEffect, useRef } from "react";

import useStateContext from "../context/useStateContext";

import Button from "./Button";
import Icon from "./Icon";

export default function Shortcuts() {
  const { dispatch, isShortcutsPanelOpen } = useStateContext();

  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isShortcutsPanelOpen &&
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        dispatch({ type: "toggleShortcuts" });
      }
    };

    if (isShortcutsPanelOpen) {
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
  }, [isShortcutsPanelOpen, dispatch]);

  return (
    <div
      ref={componentRef}
      className="modal-container enter-transition scrollbar-none"
    >
      <h1 className="header-title">
        <Button type="close" actionType="toggleShortcuts">
          <Icon name="x" color="white" />
        </Button>
        <span className="text-base">Shortcuts</span>
      </h1>

      <div className="mt-3 mb-2 flex w-full font-medium">
        <ul className="flex w-full flex-col gap-2 px-3">
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd">/</kbd>
            <span className="shortcuts-des">Open Shortcuts List</span>
          </li>
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd">N</kbd>
            <span className="shortcuts-des">Create New Task</span>
          </li>
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd">E</kbd>
            <span className="shortcuts-des">Edit Viewing Task</span>
          </li>
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd">DEL</kbd>
            <span className="shortcuts-des">Delete Viewing Task</span>
          </li>
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd">M</kbd>
            <span className="shortcuts-des">Open Menu</span>
          </li>
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd">C</kbd>
            <span className="shortcuts-des">Open Calendar</span>
          </li>
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd text-xs">ESC</kbd>
            <span className="shortcuts-des">Close Panels</span>
          </li>
          
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd">W</kbd>
            <kbd className="shortcuts-kbd">↑</kbd>
            <span className="shortcuts-des">Go to Previous Task</span>
          </li>
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd">S</kbd>
            <kbd className="shortcuts-kbd">↓</kbd>
            <span className="shortcuts-des">Go to Next Task</span>
          </li>
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd">R</kbd>
            <span className="shortcuts-des">Go to Current Task</span>
          </li>
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd">A</kbd>
            <kbd className="shortcuts-kbd">←</kbd>
            <span className="shortcuts-des">Go to Previous Day</span>
          </li>
          <li className="shortcuts-li">
            <kbd className="shortcuts-kbd">D</kbd>
            <kbd className="shortcuts-kbd">→</kbd>
            <span className="shortcuts-des">Go to Next Day</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
