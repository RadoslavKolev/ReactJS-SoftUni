import React, { useState } from "react";
import ReactDOM from 'react-dom';

import * as userService from '../../services/userService';
import UserDetails from "./UserRow/UserDetails/UserDetails";
import UserRow from "./UserRow/UserRow";
import DownArrowIcon from "../common/DownArrowIcon/DownArrowIcon";

const UsersTable = ({ users }) => {
  // We set it to null for the conditional rendering of <UserDetails />
  // The empty object is truthy, that's why we set it to null
  const [selectedUser, setSelectedUser] = useState(null);

  const detailsClickHandler = (userId) => {
    userService.getUser(userId)
      .then(user => setSelectedUser(user));
  };

  const userRows = users.map((user) => (
    <UserRow 
      key={user._id} 
      user={user} 
      onDetailsClick={detailsClickHandler} 
    />
  ));

  return (
    <div className="table-wrapper">
      {/* Displaying User Details when Info button is clicked */}
      {/* Placing the modal in different div */}
      {selectedUser && ReactDOM.createPortal(
        <UserDetails user={selectedUser} />,
        document.getElementById("user-details")
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>
              First name
              <DownArrowIcon active={""} />
            </th>
            <th>
              Last name
              <DownArrowIcon active={""} />
            </th>
            <th>
              Email
              <DownArrowIcon active={""} />
            </th>
            <th>
              Phone
              <DownArrowIcon active={""} />
            </th>
            <th>
              Created
              <DownArrowIcon active={"active-icon"} />
            </th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{userRows}</tbody>
      </table>
    </div>
  );
};

export default UsersTable;
