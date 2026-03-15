import React from "react";

const LoadingSpinner = ({ size = "w-5 h-5", className = "" }) => {
  return (
    <div
      className={`${size} mr-2 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin ${className}`}
    ></div>
  );
};

export default LoadingSpinner;