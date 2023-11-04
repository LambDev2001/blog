import React, { useState } from "react";

const Test = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <button
        className={`w-14 h-8 flex items-center justify-between rounded-full p-1 relative overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-gray-300"
        }`}
        onClick={toggleTheme}>
        <span
          className={`w-6 h-6 rounded-full ${
            isDarkMode ? "translate-x-full bg-gray-300" : "bg-gray-800"
          } absolute transform transition-transform duration-300 ease-in-out`}></span>
      </button>
    </div>
  );
};

export default Test;
