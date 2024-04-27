"use client";

import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faTrashAlt,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const UserListItem = ({
  user,
  onAccordionToggle,
  onDeleteUser,
  onEditUser,
  onSaveUser,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const toggleAccordion = () => {
    if (!editMode) {
      // Check if not in edit mode
      setIsExpanded((prevState) => !prevState);
      onAccordionToggle(user.id);
    }
  };

  const handleEdit = () => {
    // Allow editing only if the user is an adult
    const userAge = calculateAge(user.dob);
    if (userAge < 18) {
      alert("You can only edit users who are adults.");
      return;
    }
    setEditMode(true);
  };

  const handleSave = () => {
    // Validate edited user details
    if (!validateUserDetails(editedUser)) {
      alert("Please fill in all fields and ensure valid inputs.");
      return;
    }

    // Update user details
    onSaveUser(editedUser);
    setEditMode(false);
  };

  const handleCancel = () => {
    // Revert the edited user details to their initial state
    setEditedUser({ ...user });
    setEditMode(false);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditedUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input is for full name, split it into first and last names
    if (name === "fullName") {
      const [firstName, lastName] = value.split(" ");
      setEditedUser((prevUser) => ({
        ...prevUser,
        first: firstName || "",
        last: lastName || "",
      }));
    } else {
      // Otherwise, update the edited user details
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleDelete = () => {
    onDeleteUser(user.id);
    setShowDeleteDialog(false);
  };

  const validateUserDetails = (user) => {
    const countryRegex = /^[a-zA-Z\s]*$/; 
    return (
      user.first.trim() !== "" &&
      user.last.trim() !== "" &&
      user.age !== "" &&
      user.gender.trim() !== "" &&
      countryRegex.test(user.country.trim()) && 
      user.description.trim() !== ""
    );
  };

  return (
    <div
      className={`user-list-item border border-slate-300 rounded-xl px-5 py-5 max-w-xl ${
        isExpanded ? "expanded my-2 transition ease-in-out delay-100" : "my-2"
      }`}
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
      <div className="accordion-header flex items-center justify-between">
        <div className="flex items-center">
          {!editMode && (
            <>
              <img
                className="rounded-full border border-slate-300"
                src={editedUser.picture}
                alt={`${editedUser.first} ${editedUser.last}`}
                width={60}
                height={60}
              />
              <h3 className="pl-3 text-xl">{`${editedUser.first} ${editedUser.last}`}</h3>
            </>
          )}
          {editMode && (
            <>
              <img
                className="rounded-full border border-slate-300"
                src={editedUser.picture}
                alt={`${editedUser.first} ${editedUser.last}`}
                width={60}
                height={60}
              />
              <input
                type="text"
                name="fullName"
                value={`${editedUser.first} ${editedUser.last}`}
                onChange={handleInputChange}
                className="border border-slate-300 rounded px-3 py-1 w-40 rounded-xl pl-3 text-xl ml-2"
                placeholder="Full Name"
              />
            </>
          )}
        </div>
        <span
          className="cursor-pointer transition duration-300 ease-in-out"
          onClick={toggleAccordion}
        >
          {isExpanded ? (
            <svg
              className="w-6 h-6 text-gray-800 dark:text-slate-300"
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
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 15 7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-800 dark:text-slate-300"
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
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          )}
        </span>
      </div>
      <div className="accordion-content">
        {isExpanded && !editMode && (
          <div>
            <div className="flex flex-row justify-between mb-4 min-w-max pt-2 mt-3">
              <div className="flex flex-row flex-grow">
                <div className="flex flex-col w-44">
                  <p className="mr-4 text-sm font-light">Age: </p>
                  <span className="">{calculateAge(user.dob)} Years</span>
                </div>
                <div className="flex flex-col">
                  <p className="mr-4 text-sm font-light w-44">Gender: </p>
                  <span className="capitalize">
                    {user.gender === "not_specified"
                      ? "Rather Not Say"
                      : user.gender}
                  </span>
                </div>
                <div className="flex flex-col w-44">
                  <p className="mr-4 text-sm font-light">Country: </p>
                  <span className="">{user.country}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="mr-4 text-sm font-light">Description: </p>
              <span className="capitalize ">{user.description}</span>
            </div>
            <div className="flex justify-end">
              {!editMode && (
                <>
                  <button onClick={() => setShowDeleteDialog(true)}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="w-5 h-5 text-gray-200 dark:text-red-500 mr-5"
                    />
                  </button>
                  <button onClick={handleEdit}>
                    <FontAwesomeIcon
                      icon={faPen}
                      className="w-5 h-5 text-gray-200 dark:text-blue-500 mr-2"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {isExpanded && editMode && (
          <div>
            <div className="flex flex-row justify-between mb-4 min-w-max pt-2 mt-3">
              <div className="flex flex-row flex-grow">
                <div className="flex flex-col w-44">
                  <label htmlFor="age" className="mr-2 text-sm font-light">
                    Age:
                  </label>
                  {/* <input
                    type="date"
                    id="age"
                    name="age"
                    // value={calculateAge(user.dob)}
                    value={user.dob}
                    onChange={handleInputChange}
                    className="border border-slate-300 rounded px-3 py-1 w-40 rounded-xl"
                  /> */}
                  <input
                    type="date"
                    id="age"
                    name="dob"
                    value={editedUser.dob}
                    onChange={handleInputChange}
                    className="border border-slate-300 rounded px-3 py-1 w-40 rounded-xl"
                  />
                </div>
                <div className="flex flex-col w-44">
                  <label htmlFor="gender" className="mr-2 text-sm font-light">
                    Gender:
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={editedUser.gender}
                    onChange={handleInputChange}
                    className="border border-slate-300 rounded px-3 py-1 w-40 rounded-xl"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="not_specified">Rather Not Say</option>
                  </select>
                </div>
                <div className="flex flex-col pr-10 w-44">
                  <label htmlFor="country" className="mr-2 text-sm font-light">
                    Country:
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={editedUser.country}
                    onChange={handleInputChange}
                    className="border border-slate-300 rounded px-3 py-1 w-40 rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="description" className="mr-2 text-sm font-light">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                value={editedUser.description}
                onChange={handleInputChange}
                className="border border-slate-300 rounded px-3 py-1"
              ></textarea>
            </div>
            <div className="flex justify-end">
              {editMode && (
                <>
                  <button onClick={handleSave}>
                    <FontAwesomeIcon
                      className="border border-green-500 rounded-full p-2 mr-3"
                      icon={faCheck}
                      style={{ color: "green" }}
                    />
                  </button>
                  <button onClick={handleCancel} className="mr-2">
                    <FontAwesomeIcon
                      className="border border-red-500 rounded-full p-2"
                      icon={faTimes}
                      style={{
                        color: "red",
                        paddingLeft: "0.6rem",
                        paddingRight: "0.6rem",
                      }}
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {showDeleteDialog && (
        <DeleteDialog
          onCancel={() => setShowDeleteDialog(false)}
          onDelete={handleDelete}
        />
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
