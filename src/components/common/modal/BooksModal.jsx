import React from "react";

function BooksModal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white w-full h-full
          md:w-[90%] md:h-[90vh]
          rounded-none md:rounded-xl
          shadow-2xl
          flex flex-col
        "
      >
        {children}
      </div>
    </div>
  );
}

export default BooksModal;