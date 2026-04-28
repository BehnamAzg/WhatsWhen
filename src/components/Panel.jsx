import { useStateContext } from "./StateProvider";

import Menu from "./Menu";
import Calendar from "./Calendar";
import CreateTask from "./CreateTask";
import Shortcuts from "./Shortcuts";

export default function Panel() {
  const { isCalendarPanelOpen, isMenuPanelOpen, isCreateTaskPanelOpen, isShortcutsPanelOpen } = useStateContext();
  return (
    <>
      {isCalendarPanelOpen && <Calendar />}
      {isMenuPanelOpen && <Menu />}
      {isCreateTaskPanelOpen && <CreateTask />}
      {isShortcutsPanelOpen && <Shortcuts />}
    </>
  );
}
