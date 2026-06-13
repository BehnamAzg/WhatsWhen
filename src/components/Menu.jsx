import { useEffect, useRef } from "react";

import useStateContext from "../context/useStateContext";

import Accordion from "./Accordion";
import Button from "./Button";
import Icon from "./Icon";
import ThemeSelector from "./ThemeSelector";
import Version from "./Version";
import Link from "./Link";
import Warning from "./Warning";

export default function Menu() {
  const {
    dispatch,
    isMenuPanelOpen,
    isShortcutsPanelOpen,
    isStoragePersistent,
  } = useStateContext();
  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isShortcutsPanelOpen) return;
      if (
        isMenuPanelOpen &&
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        dispatch({ type: "toggleMenu" });
      }
    };

    if (isMenuPanelOpen) {
      const focusableElements = componentRef.current.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        // Fallback
        componentRef.current.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuPanelOpen, dispatch, isShortcutsPanelOpen]);

  return (
    <div
      ref={componentRef}
      className="modal-container enter-transition scrollbar-none"
    >
      <h1 className="header-title">
        <Button type="close" actionType="toggleMenu">
          <Icon name="x" color="white" />
        </Button>
        <span className="text-base">WhatsWhen?</span>
      </h1>

      <div className="menu-row-container mt-4">
        <ThemeSelector />
        <Button type="capsule" actionType="toggleShortcuts">
          <Icon name="command" size="14" />
          <span>Shortcuts</span>
        </Button>
      </div>

      <div className="menu-row-container mt-2 flex-col gap-3">
        <Accordion icon="info" title="About WhatsWhen?">
          <div className="accordian-details">
            <p>
              WhatsWhen is a "free" and "open-source" daily planner and time
              manager app.
            </p>
            <p>
              This app is client-side and your data will not be stored on any
              server.{" "}
              <Link link="https://github.com/BehnamAzg/WhatsWhen">
                Read More
              </Link>
            </p>
          </div>
        </Accordion>

        <Accordion icon="import" title="Import / Export Data">
          <p className="accordian-details">
            This feature is NOT available yet in this version.{" "}
            <Link link="https://github.com/BehnamAzg/WhatsWhen">Read More</Link>
          </p>

          <div className="menu-row-container mb-2">
            <Button type="capsule" width="full" actionType="importData">
              <Icon name="download" />
              <span>Import Data</span>
            </Button>
            <Button type="capsule" width="full" actionType="exportData">
              <Icon name="export" />
              <span>Export Data</span>
            </Button>
          </div>
        </Accordion>

        <div className="menu-row-container">
          <Button
            type="capsule"
            width="fit"
            link="https://github.com/BehnamAzg/WhatsWhen"
          >
            <Icon name="github" />
            <span>Github</span>
          </Button>

          <Button
            type="capsule"
            width="full"
            link="https://github.com/BehnamAzg/WhatsWhen/issues"
          >
            <Icon name="bug" />
            <span>Report Bugs / Feedback</span>
          </Button>
        </div>

        <div className="menu-row-container">
          <Button
            type="capsule"
            width="full"
            link="https://behnamazg.github.io/Donation"
          >
            <Icon name="heart" size="14" color="primary" />
            <span>Donate</span>
          </Button>
          <Button type="capsule" width="fit">
            <Icon name="share" />
            <span>share</span>
          </Button>
        </div>

        {!isStoragePersistent && (
          <div className="menu-row-container">
            <Warning>
              <p>
                "Persistent Storage" is not activated, Install the app to avoid
                losing your data.{" "}
                <Link
                  link="https://github.com/BehnamAzg/WhatsWhen"
                  color="white"
                >
                  Read More
                </Link>
              </p>
            </Warning>
          </div>
        )}

        <div className="menu-row-container">
          <Button type="install">
            <Icon name="download" color="white" />
            <span>Install The App</span>
          </Button>
        </div>

        <Version />

        {/* <p className="my-1 text-[10px] w-full text-center text-violet-400">
          &copy; {new Date().getFullYear()} WhatsWhen? - All Rights Reserved.
        </p> */}
      </div>
    </div>
  );
}
