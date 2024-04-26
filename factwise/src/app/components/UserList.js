"use client";

import UserListItem from "./UserListItem";

const UserList = ({ users, onAccordionToggle, onEditUser }) => {
  return (
    <div className="user-list pt-5">
      {users.length === 0 ? (
        <p>No data exists.</p>
      ) : (
        users.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            onAccordionToggle={onAccordionToggle}
            // onDeleteUser={onDeleteUser}
            onEditUser={onEditUser}
          />
        ))
      )}
    </div>
  );
};

export default UserList;
