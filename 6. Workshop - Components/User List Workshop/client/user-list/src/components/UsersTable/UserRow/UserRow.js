import React from "react";

import UserActions from "./UserActions/UserActions";

const UserRow = ({ users }) => {
  const userRow = users.map((user) => {
    return (
      <tr key={user._id}>
        <td>
          <img
            src={user.imageUrl}
            alt={`${user.firstName}'s profile`}
            className="image"
          />
        </td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.createdAt}</td>
        <UserActions />
      </tr>
    );
  });

  return userRow;
};

export default UserRow;
