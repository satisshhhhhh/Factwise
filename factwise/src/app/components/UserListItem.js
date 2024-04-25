"use client";

import { useState } from "react";

const UserListItem = ({ user, onAccordionToggle}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleAccordion = () => {
    setIsExpanded(prevState => !prevState);
    onAccordionToggle(user.id);
  };

  return (
    <div
    className={`user-list-item border border-slate-300 rounded-xl px-5 py-5 mt-2 max-w-xl min-w-xl ${
      isExpanded ? "expanded" : ""
    }`}
    style={{ transition: "max-height 0.3s ease-in-out" }}
    >
      {/* <div className="accordion-header flex flex-row items-center">
        <img
          className="rounded-full border border-slate-300 "
          src={user.picture}
          alt={`${user.first} ${user.last}`}
          width={60}
          height={60}
        />
        <h3 className="pl-3">{`${user.first} ${user.last}`}</h3>
        <span>{isExpanded ? "-" : "+"}</span>
      </div> */}
      <div className="accordion-header flex items-center justify-between" onClick={toggleAccordion} style={{ transition: "height 0.3s ease-in-out" }}> 
        <div className="flex items-center">
          <img
            className="rounded-full border border-slate-300"
            src={user.picture}
            alt={`${user.first} ${user.last}`}
            width={60}
            height={60}
          />
          <h3 className="pl-3 text-xl">{`${user.first} ${user.last}`}</h3>
        </div>
        <span>
          {isExpanded ? (
            <svg
              class="w-6 h-6 text-gray-800 dark:text-slate-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m5 15 7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              class="w-6 h-6 text-gray-800 dark:text-slate-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          )}
        </span>
      </div>
      {isExpanded && (
        <div className="accordion-content mt-3">
          <div className="flex flex-row justify-between mb-4 min-w-max pt-2">
            <div className="flex flex-row justify-between flex-grow">
              <div className="flex flex-col">
                <p className="mr-4 text-sm font-light">Age: </p>
                <span className="">{calculateAge(user.dob)} Years</span>
              </div>
              <div className="flex flex-col">
                <p className="mr-4 text-sm font-light">Gender: </p>
                <span className="capitalize ">{user.gender}</span>
              </div>
              <div className="flex flex-col pr-10">
                <p className="mr-4 text-sm font-light">Country: </p>
                <span className="">{user.country}</span>
              </div>
            </div>
          </div>
          {/* <div className="flex mb-4">
            <p className="mr-6">Age: {calculateAge(user.dob)}</p>
            <p className="mr-6">Gender: {user.gender}</p>
            <p>Country: {user.country}</p>
          </div> */}
          <div className="flex flex-col">
            <p className="mr-4 text-sm font-light">Description: </p>
            <span className="capitalize ">{user.description}</span>
          </div>
          <div className="flex justify-end mb-2">
            <button onClick={() => onDeleteUser(user)}>
              <svg
                class="w-6 h-6 text-gray-800 dark:text-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
            </button>
            <button 
            className="mr-2 ml-5"
            onClick={() => onEditUser(user.id)}>
              <svg
                class="w-6 h-6 text-gray-800 dark:text-indigo-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListItem;

function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
