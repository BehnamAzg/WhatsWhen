import { useEffect, useRef } from "react";

import Button from "./Button";
import Icon from "./Icon";

export default function Shortcuts({ dispatch, isShortcutsPanelOpen }) {
  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isShortcutsPanelOpen && componentRef.current && !componentRef.current.contains(event.target)) {
        dispatch({ type: "toggleShortcuts" });
      }
    };

    if (isShortcutsPanelOpen) {
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
  }, [isShortcutsPanelOpen, dispatch]);

  return (
    <div ref={componentRef} className="modal-container enter-transition">
      <h1 className="header-title">
        <Button type="close" dispatch={dispatch} actionType="toggleShortcuts">
          <Icon name="x" color="white" />
        </Button>
        <span className="text-base">Shortcuts</span>
      </h1>

      <div className="menu-row-container mt-4 flex-col gap-3">list of shortcuts...</div>
    </div>
  );
}
