import Button from "./Button";

export default function ThemeSelector() {
  return (
    <div className="capsule-container">
      <h3>Theme</h3>
      <div className="flex gap-x-2">
        <Button type="themeSelected">Light</Button>
        <Button type="theme">Dark</Button>
      </div>
    </div>
  );
}
