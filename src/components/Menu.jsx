import { useEffect, useRef } from "react";

import Accordion from "./Accordion";
import Button from "./Button";
import Icon from "./Icon";
import ThemeSelector from "./ThemeSelector";
import Version from "./Version";

export default function Menu({ dispatch, isMenuPanelOpen }) {
  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuPanelOpen && componentRef.current && !componentRef.current.contains(event.target)) {
        dispatch({ type: "toggleMenu" });
      }
    };

    if (isMenuPanelOpen) {
      const focusableElements = componentRef.current.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
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
  }, [isMenuPanelOpen, dispatch]);

  return (
    <div ref={componentRef} className="modal-container enter-transition">
      <h1 className="header-title">
        <Button type="close" dispatch={dispatch} actionType="toggleMenu">
          <Icon name="x" color="white" />
        </Button>
        <span className="text-base">WhatsWhen?</span>
      </h1>

      <div className="menu-row-container mt-4">
        <ThemeSelector />
        <Button type="capsule" dispatch={dispatch} actionType="toggleShortcuts">
          <Icon name="command" size="14" />
          <span>Shortcuts</span>
        </Button>
      </div>

      <div className="menu-row-container mt-2 flex-col gap-3">
        <Accordion icon="info" title="About WhatsWhen?">
          <p className="accordian-details">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem sapiente similique natus eos incidunt esse, maxime labore repellat officia nulla rerum nihil.</p>
        </Accordion>

        <Accordion icon="import" title="Import / Export Data">
          <p className="accordian-details">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem sapiente similique natus eos incidunt esse, maxime labore repellat officia nulla rerum nihil.</p>

          <div className="menu-row-container mb-2 ">
            <Button type="capsule" width="full">
              <Icon name="download" />
              <span>Import Data</span>
            </Button>
            <Button type="capsule" width="full">
              <Icon name="export" />
              <span>Export Data</span>
            </Button>
          </div>
        </Accordion>

        <div className="menu-row-container">
          <Button type="capsule" width="fit">
            <Icon name="bug" />
            <span>Report Bugs / Feedback</span>
          </Button>
          <Button type="capsule" width="full">
            <Icon name="share" />
            <span>share</span>
          </Button>
        </div>

        <div className="menu-row-container">
          <Button type="capsule" width="fit">
            <Icon name="github" />
            <span>Github</span>
          </Button>
          <Button type="capsule" width="full">
            <Icon name="clipboard" />
            <span>Release Notes</span>
          </Button>
        </div>

        <div className="menu-row-container">
          <Button type="capsule" width="full">
            <Icon name="heart" size="14" color="primary" />
            <span>Donate</span>
          </Button>
        </div>

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
