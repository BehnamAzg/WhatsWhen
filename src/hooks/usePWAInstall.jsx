import { useEffect, useRef, useState } from "react";

export function usePWAInstall() {
  const deferredPromptRef = useRef(null);
  const [canInstall, setCanInstall] = useState(false);

  const [isInstalled] = useState(() => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true ||
      document.referrer.includes("android-app://")
    );
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPromptRef.current = e;
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  async function install() {
    const prompt = deferredPromptRef.current;
    if (!prompt) return;

    prompt.prompt();
    const { outcome } = await prompt.userChoice;

    if (outcome === "accepted") {
      setCanInstall(false);
    }

    deferredPromptRef.current = null;
  }

  return { canInstall, isInstalled, install };
}
