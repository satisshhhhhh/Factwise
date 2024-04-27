"use client";
import { useState, useEffect } from "react";
import userData from "./data/celebrities.json";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedUserId, setEditedUserId] = useState(null);

  useEffect(() => {
    setUsers(userData);
  }, []);

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

  const handleEditUser = (userId) => {
    setEditedUserId(userId);
  };

  const handleSaveUser = (editedUser) => {
    // Find the index of the edited user in userData
    const index = users.findIndex((user) => user.id === editedUser.id);
    if (index !== -1) {
      // Update the userData with the edited user
      const updatedUsers = [...users];
      updatedUsers[index] = editedUser;
      setUsers(updatedUsers);
    }
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
          onSaveUser={handleSaveUser}
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
