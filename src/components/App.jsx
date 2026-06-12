import StateProvider from "../context/StateProvider";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Panel from "./Panel";
import AppWrapper from "./AppWrapper";

export default function App() {
  
  // Request Persistance Storage
  (async function () {
    if (navigator.storage && navigator.storage.persist) {
      if (!(await navigator.storage.persisted())) {
        const result = await navigator.storage.persist();
        console.log(`The persistance request returned: ${result}`);
      }
    }
  })();

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
