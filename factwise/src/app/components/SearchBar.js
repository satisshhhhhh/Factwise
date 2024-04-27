"use client";
import React from "react";

const SearchBar = ({ handleSearch }) => {
  const handleChange = (event) => {
    handleSearch(event.target.value);
  };

  return (
    <div className="search-bar flex mt-5 border border-slate-400 rounded py-2 rounded-xl">
      <svg
        className="w-6 h-6 text-gray-800 dark:text-slate-400 mx-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        />
      </svg>

      <input
        type="text"
        placeholder="Search user"
        onChange={handleChange}
        className="border-none flex-grow mr-2"
      />
    </div>
  );
};

export default SearchBar;
