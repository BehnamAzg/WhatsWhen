import { useEffect, useRef } from "react";

import useStateContext from "../context/useStateContext";
import { shareApp } from "../utils/share";

import Accordion from "./Accordion";
import Button from "./Button";
import Icon from "./Icon";
import ThemeSelector from "./ThemeSelector";
import Link from "./Link";
import InstallButton from "./InstallButton";

export default function Menu() {
  const { dispatch, isMenuPanelOpen, isShortcutsPanelOpen } = useStateContext();
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
        <span className="text-base">Menu</span>
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
              WhatsWhen is a "Free" and "Open-Source" Daily Planner and Task
              Manager Application.
            </p>
            <br />
            <p className="text-right">
              <Link link="https://github.com/BehnamAzg/WhatsWhen?tab=readme-ov-file#about">
                Read More
              </Link>
            </p>
          </div>
        </Accordion>

        <Accordion icon="import" title="Import / Export Data">
          <div className="accordian-details">
            <p>This feature is NOT available yet in this version. </p>
            <p className="text-right">
              <Link link="https://github.com/BehnamAzg/WhatsWhen#-export-and-importing-data">
                Learn More
              </Link>
            </p>
          </div>

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
          <Button type="capsule" width="fit" onClick={shareApp}>
            <Icon name="share" />
            <span>share</span>
          </Button>
        </div>

        <InstallButton />

        <div className="menu-row-container">
          {/* License */}
          <Button
            type="capsule"
            width="full"
            link="https://github.com/BehnamAzg/WhatsWhen?tab=GPL-3.0-1-ov-file"
          >
            <Icon name="copyleft" size="12" />
            <span className="dark:text-dark-theme-text text-[10px]">
              {new Date().getFullYear()} WhatsWhen?
            </span>
          </Button>
          {/* Privacy Policy */}
          <Button type="capsule" width="full">
            <Icon name="shield-check" size="12" />
            <span className="dark:text-dark-theme-text text-[10px]">
              Privacy Policy
            </span>
          </Button>
        </div>

        <div className="menu-row-container mb-2">
          {/* Version */}
          <Button
            type="capsule"
            width="full"
            link="https://github.com/BehnamAzg/WhatsWhen"
          >
            <Icon name="code" size="12" />
            <span className="dark:text-dark-theme-text text-[10px]">
              Version 0.9.0 - BETA
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
