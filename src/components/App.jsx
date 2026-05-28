import StateProvider from "../context/StateProvider";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Panel from "./Panel";
import AppWrapper from "./AppWrapper";

export default function App() {
  return (
    <StateProvider>
      <AppWrapper>
        <Header />
        <Main />
        <Footer />
        <Panel />
      </AppWrapper>
    </StateProvider>
  );
}
