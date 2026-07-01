import { useEffect, useState } from "react";

// Shared module state (persists across all hook usages)
let deferredPrompt = null;
let installAvailable = false;

const listeners = new Set();

// Register immediately when file is imported
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();

    deferredPrompt = e;
    installAvailable = true;

    listeners.forEach((listener) => listener(true));
  });
}

export function usePWAInstall() {
  const [canInstall, setCanInstall] = useState(installAvailable);

  const [isInstalled] = useState(() => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true ||
      document.referrer.includes("android-app://")
    );
  });

  useEffect(() => {
    listeners.add(setCanInstall);

    return () => {
      listeners.delete(setCanInstall);
    };
  }, []);

  async function install() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      installAvailable = false;
      setCanInstall(false);
    }

    deferredPrompt = null;
  }

  return { canInstall, isInstalled, install };
}
