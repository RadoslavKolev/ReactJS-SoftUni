import React from "react";

import DownArrowIcon from "../common/DownArrowIcon/DownArrowIcon";
import UserRow from "./UserRow/UserRow";

const UsersTable = ({ users }) => {
  const userRows = users.map((user) => <UserRow key={user._id} user={user} />);

  return (
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
  );
};

export default UsersTable;
