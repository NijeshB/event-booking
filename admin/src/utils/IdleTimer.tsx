import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const CHECK_DELAY = 5 * 60 * 1000; // 5 minutes

const IdleTimer = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const inactiveTime = Date.now() - lastActivityRef.current;
      if (inactiveTime >= IDLE_TIMEOUT) {
        handleLogout();
      } else {
        resetTimer(); // Schedule the next check in 5 minutes
      }
    }, CHECK_DELAY);
  };

  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
      resetTimer(); // Restart the timer on activity
    };

    const events = ["keydown", "click"];
    events.forEach((event) => window.addEventListener(event, updateActivity));

    resetTimer(); // Start the initial check

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateActivity),
      );
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return null;
};

export default IdleTimer;
