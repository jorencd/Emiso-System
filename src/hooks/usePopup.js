import { useState } from "react";

export const usePopup = () => {
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    success: false,
  });

  const showPopup = (msg, success = false) => {
    setPopup({ show: true, message: msg, success });
  };

  const hidePopup = () => {
    setPopup({ ...popup, show: false });
  };

  return {
    popup,
    showPopup,
    hidePopup,
  };
};