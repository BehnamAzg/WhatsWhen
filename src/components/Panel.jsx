import useStateContext from "../context/useStateContext";

import Menu from "./Menu";
import Calendar from "./Calendar";
import CreateTask from "./CreateTask";
import Shortcuts from "./Shortcuts";
import Emoji from "./Emoji";

export default function Panel() {
  const {
    isCalendarPanelOpen,
    isMenuPanelOpen,
    isCreateTaskPanelOpen,
    isShortcutsPanelOpen,
    isEmojiPanelOpen,
  } = useStateContext();
  return (
    <>
      {isCalendarPanelOpen && <Calendar />}
      {isMenuPanelOpen && <Menu />}
      {isCreateTaskPanelOpen && <CreateTask />}
      {isShortcutsPanelOpen && <Shortcuts />}
      {isEmojiPanelOpen && <Emoji />}
    </>
  );
}
