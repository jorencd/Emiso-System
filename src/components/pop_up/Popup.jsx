import React from "react";

function Popup({ show, message, success, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-6 w-80 text-center shadow-xl">
        <h2
          className={`text-xl font-bold mb-2 ${
            success ? "text-green-700" : "text-red-500"
          }`}
        >
          {success ? "Success" : "Notice"}
        </h2>

        <p className="mb-4">{message}</p>

        <button
          onClick={onClose}
          className="bg-green-700 text-white px-6 py-2 rounded w-full"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default Popup;
