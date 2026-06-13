import useStateContext from "../context/useStateContext";
import Button from "./Button";

export default function ThemeSelector() {
  const { preferences } = useStateContext();

  return (
    <div className="capsule-container">
      <h3 className="text-black dark:text-dark-theme-text">Theme</h3>
      <div className="flex gap-x-2">
        <Button
          type={preferences.theme === "light" ? "themeSelected" : "theme"}
          actionType="changeTheme"
          actionPayload="light"
        >
          Light
        </Button>
        <Button
          type={preferences.theme === "dark" ? "themeSelected" : "theme"}
          actionType="changeTheme"
          actionPayload="dark"
        >
          Dark
        </Button>
      </div>
    </div>
  );
}
