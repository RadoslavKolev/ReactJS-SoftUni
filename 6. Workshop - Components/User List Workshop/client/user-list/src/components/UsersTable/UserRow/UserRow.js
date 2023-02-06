import React from "react";

import { formatDate } from "../../../functions/formatDate";
import UserActions from "./UserActions/UserActions";

const UserRow = ({ user }) => {
  return (
    <tr>
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
      <td>{formatDate(user.createdAt)}</td>
      <UserActions />
    </tr>
  );
};

export default UserRow;
