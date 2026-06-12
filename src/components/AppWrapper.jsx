import useStateContext from "../context/useStateContext";

export default function AppWrapper({ children }) {
  const { preferences } = useStateContext();

  return (
    <div className="app-outter-container" data-theme={preferences.theme}>
      <div className="app-inner-container">{children}</div>
    </div>
  );
}
