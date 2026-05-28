import useStateContext from "../context/useStateContext";

export default function AppWrapper({ children }) {
  const { theme } = useStateContext();

  return (
    <div className="app-outter-container" data-theme={theme}>
      <div className="app-inner-container">{children}</div>
    </div>
  );
}
