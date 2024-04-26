"use client";
import { useState, useEffect } from "react";
import userData from "./data/celebrities.json";
import Image from "next/image";
import ChangeTheme from "./components/ChangeTheme";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setUsers(userData);
  }, []);
  console.log(users);

  const filteredUsers = users.filter((user) =>
    `${user.first} ${user.last}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleAccordionToggle = (id) => {
    setEditedUserId(editedUserId === id ? null : id);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleEditUser = (user) => {
    setEditedUserId(user.id);
  };

  const handleSaveUser = (editedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editedUser.id ? { ...user, ...editedUser } : user
      )
    );
    setEditedUserId(null);
  };

  const handleDeleteUser = (id) => {
    // if (window.confirm("Are you sure you want to delete this user?")) {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    // }
  };

  const handleCancelEdit = () => {
    setEditedUserId(null);
  };

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-200 dark:bg-gray-800">
    // <main className="flex h-screen ">
    <main className="flex ">
      <div className="m-auto">
        <SearchBar handleSearch={handleSearch} />
        <UserList
          users={filteredUsers}
          onAccordionToggle={handleAccordionToggle}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
        />

        {/* {userData.map( (user) => (
          <div className='border border-slate-300 rounded px-5 py-10'>
            <div className='flex flex-row'>
              <img 
                className='rounded-full border border-slate-300 '
                src={user.picture}
                width={60}
                height={60}
                alt="Profile picture"
              />
            </div>
            <div className='grow'>
              {user.first}
            </div>

          </div>
        ))} */}
      </div>
    </main>
  );
}
