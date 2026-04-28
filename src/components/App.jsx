import { StateProvider } from "./StateProvider";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import Panel from "./Panel";

export default function App() {
  return (
    <div className="app-outter-container">
      <div className="app-inner-container">
        <StateProvider>
          <Header />
          <Main />
          <Footer />
          <Panel />
        </StateProvider>
      </div>
    </div>
  );
}

/*
<Header dispatch={dispatch} currentDate={currentDate} viewDate={viewDate} cardsCount={dates[viewDate]?.length || 0} />
          <Main dispatch={dispatch} cards={dates[viewDate]} />
          <Footer dispatch={dispatch} />
          {isCalendarPanelOpen && <Calendar dispatch={dispatch} isCalendarPanelOpen={isCalendarPanelOpen} />}
          {isMenuPanelOpen && <Menu dispatch={dispatch} isMenuPanelOpen={isMenuPanelOpen} />}
          {isCreateTaskPanelOpen && <CreateTask dispatch={dispatch} isCreateTaskPanelOpen={isCreateTaskPanelOpen} />}
          {isShortcutsPanelOpen && <Shortcuts dispatch={dispatch} isShortcutsPanelOpen={isShortcutsPanelOpen} />}
*/
