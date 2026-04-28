import StateProvider from "../context/StateProvider";

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
