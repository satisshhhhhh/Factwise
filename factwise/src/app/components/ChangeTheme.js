"use client";

import { useState } from 'react';

const ChangeTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const root = window.document.documentElement;
    root.classList.toggle('dark');
  };

  return (
    <button
      className={`rounded px-4 py-2 mb-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
      onClick={toggleTheme}
    >
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ChangeTheme;
