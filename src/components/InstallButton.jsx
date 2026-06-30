import { usePWAInstall } from "../hooks/usePWAInstall";
import Button from "./Button";
import Icon from "./Icon";

export default function InstallButton() {
  const { canInstall, install, isInstalled } = usePWAInstall();
  if (!canInstall || isInstalled) return null;
  return (
    <Button type="install" onClick={install}>
      <Icon name="download" color="white" />
      <span>Install The App</span>
    </Button>
  );
}
