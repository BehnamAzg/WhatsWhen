import useStateContext from "../context/useStateContext";
import { usePWAInstall } from "../hooks/usePWAInstall";
import Button from "./Button";
import Icon from "./Icon";
import Warning from "./Warning";
import Link from "./Link";

export default function InstallButton() {
  const { isStoragePersistent } = useStateContext();
  const { canInstall, install, isInstalled } = usePWAInstall();

  if (!canInstall || isInstalled) return null;

  return (
    <>
      {!isStoragePersistent && (
        <div className="menu-row-container">
          <Warning>
            <p>
              "Persistent Storage" is not activated, Install the app to avoid
              losing your data.{" "}
              <Link
                link="https://github.com/BehnamAzg/WhatsWhen?tab=readme-ov-file#-persistent-storage"
                color="white"
              >
                Learn More
              </Link>
            </p>
          </Warning>
        </div>
      )}
      <div className="menu-row-container">
        <Button type="install" onClick={install}>
          <Icon name="download" color="white" />
          <span>Install The App</span>
        </Button>
      </div>
    </>
  );
}
