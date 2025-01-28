import { useState, useEffect } from "react";
import { showSuccess, showWarn } from "../utils/toast";
import { toast } from "react-toastify";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => {
      setIsOnline(true);
      toast.dismiss("offline-warning");
      showSuccess("Back online!", {
        autoClose: 3000,
        toastId: "online-warning",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      showWarn("You are offline. Check your internet connection.", {
        autoClose: false, // Keep the toast until the user reconnects
        toastId: "offline-warning", // Prevent duplicate toasts
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};
