import useStateContext from "../context/useStateContext";
import Button from "./Button";

export default function ThemeSelector() {
  const { theme } = useStateContext();

  return (
    <div className="capsule-container">
      <h3>Theme</h3>
      <div className="flex gap-x-2">
        <Button
          type={theme === "light" ? "themeSelected" : "theme"}
          actionType="changeTheme"
          actionPayload="light"
        >
          Light
        </Button>
        <Button
          type={theme === "dark" ? "themeSelected" : "theme"}
          actionType="changeTheme"
          actionPayload="dark"
        >
          Dark
        </Button>
      </div>
    </div>
  );
}
