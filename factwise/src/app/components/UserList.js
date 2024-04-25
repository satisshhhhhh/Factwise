"use client";

import UserListItem from "./UserListItem";

const UserList = ({ users , onAccordionToggle}) => {
  return (
    <div className="user-list pt-5">
      {users.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          onAccordionToggle={onAccordionToggle}
          // onDeleteUser={onDeleteUser}
          // onEditUser={onEditUser}
        />
      ))}
    </div>
  );
};

export default UserList;
