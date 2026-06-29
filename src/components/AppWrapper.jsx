import { useEffect } from "react";
import useStateContext from "../context/useStateContext";
import { isStoragePersistent } from "../data/db";

export default function AppWrapper({ children }) {
  const { preferences, dispatch } = useStateContext();

  useEffect(() => {
    // Check Storage Persistance
    async function checkStorage() {
      const result = await isStoragePersistent();
      dispatch({
        type: "setStoragePersistent",
        payload: result,
      });
      // console.log(`The persistance check returned: ${result}`);
    }

    checkStorage();
  }, [dispatch]);

  return (
    <div className="app-outter-container" data-theme={preferences.theme}>
      <div className="app-inner-container">{children}</div>
    </div>
  );
}
