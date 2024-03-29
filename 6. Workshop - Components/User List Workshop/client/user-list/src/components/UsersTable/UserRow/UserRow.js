import React from "react";

import { formatTableDate } from "../../../functions/dateFormatter";
import UserActions from "./UserActions/UserActions";

const UserRow = ({ user, onEditClick, onDeleteClick, onDetailsClick }) => {
  const blankProfileUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  const formattedDate = formatTableDate(user.createdAt);

  const editUserHandler = () => onEditClick(user._id);
  const deleteUserHandler = () => onDeleteClick(user._id);
  const showUserInfoHandler = () => onDetailsClick(user._id);

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
      <UserActions 
        onEditClick={editUserHandler}
        onDeleteClick={deleteUserHandler}
        onDetailsClick={showUserInfoHandler} 
      />
    </tr>
  );
};

export default UserRow;
