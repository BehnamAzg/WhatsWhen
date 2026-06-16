import useStateContext from "../context/useStateContext";

import Menu from "./Menu";
import Calendar from "./Calendar";
import CreateTask from "./CreateTask";
import Shortcuts from "./Shortcuts";
import Emoji from "./Emoji";
import DeletePanel from "./DeletePanel";

export default function Panel() {
  const {
    isCalendarPanelOpen,
    isMenuPanelOpen,
    isCreateTaskPanelOpen,
    isShortcutsPanelOpen,
    isEmojiPanelOpen,
    isDeletePanelOpen,
  } = useStateContext();
  return (
    <>
      {isCalendarPanelOpen && <Calendar />}
      {isMenuPanelOpen && <Menu />}
      {isCreateTaskPanelOpen && <CreateTask />}
      {isShortcutsPanelOpen && <Shortcuts />}
      {isEmojiPanelOpen && <Emoji />}
      {isDeletePanelOpen && <DeletePanel />}
    </>
  );
}
