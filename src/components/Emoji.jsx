import { useEffect, useRef } from "react";
import useStateContext from "../context/useStateContext";
import { EmojiPicker } from "@ferrucc-io/emoji-picker";

import Button from "./Button";
import Icon from "./Icon";

export default function Emoji() {
  const { dispatch, isEmojiPanelOpen } = useStateContext();
  const componentRef = useRef(null);

  function handleEmojiSelect(emoji) {
    dispatch({ type: "updateNewTaskIcon", payload: emoji });
    dispatch({ type: "toggleEmoji" });
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isEmojiPanelOpen &&
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        dispatch({ type: "toggleEmoji" });
      }
    };

    // Focusing on the first element after opening a panel (for tabindex accessibility)
    if (isEmojiPanelOpen) {
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
  }, [isEmojiPanelOpen, dispatch]);

  return (
    <div
      ref={componentRef}
      className="modal-container enter-transition scrollbar-none"
    >
      <h1 className="header-title">
        <Button type="close" actionType="toggleEmoji">
          <Icon name="x" color="white" />
        </Button>
        <span className="text-base">Emoji</span>
      </h1>

      <div className="flex-center scrollbar-thumb-primary my-2">
        <EmojiPicker
          className="bg-blur border-none shadow-none"
          onEmojiSelect={handleEmojiSelect}
          emojisPerRow={10}
          tabIndex={0}
        >
          <EmojiPicker.Header>
            <EmojiPicker.Input
              className="bg-blur! dark:placeholder:text-dark-theme-text/50! dark:text-dark-theme-text! "
              placeholder="Search emoji"
            />
          </EmojiPicker.Header>
          <EmojiPicker.Group>
            <EmojiPicker.List />
          </EmojiPicker.Group>
        </EmojiPicker>
      </div>
    </div>
  );
}
