import React from "react";

import { formatTableDate } from "../../../functions/dateFormatter";
import UserActions from "./UserActions/UserActions";

const UserRow = ({ user, onDetailsClick }) => {
  const blankProfileUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  const formattedDate = formatTableDate(user.createdAt);

  return (
    <tr>
      <td>
        <img
          src={user.imageUrl || blankProfileUrl}
          alt={`${user.firstName}'s profile`}
          className="image"
        />
      </td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>
      <td>{formattedDate}</td>
      <UserActions id={user._id} onDetailsClick={onDetailsClick} />
    </tr>
  );
};

export default UserRow;
