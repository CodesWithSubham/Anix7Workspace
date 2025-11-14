// /utils/ToastProvider.js
"use client";

import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  const getToastPosition = () => {
    return typeof window !== "undefined" && window.innerWidth <= 768
      ? "top-center"
      : "bottom-right";
  };

  const getToastTheme = () => {
    return typeof window !== "undefined" && localStorage.getItem("themeMode") == "dark"
      ? "dark"
      : "light";
  };

  return (
    <ToastContainer
      position={getToastPosition()} // Dynamically set position
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={getToastTheme()}
      transition={Bounce}
    />
  );
}
