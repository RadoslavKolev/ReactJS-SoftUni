import React, { useReducer } from "react";
import ReactDOM from "react-dom";

import * as userService from "../../services/userService";
import { UserActions } from "../../actions/userActions";
import UserEdit from "./UserEdit/UserEdit";
import UserDelete from "./UserDelete/UserDelete";
import UserDetails from "./UserDetails/UserDetails";
import UserRow from "./UserRow/UserRow";
import DownArrowIcon from "../common/DownArrowIcon/DownArrowIcon";

const initialState = {
  selectedUser: null,
  userAction: null,
};  

// Reducer function that runs for every dispatch on useReducer()
const reducer = (prevState, action) => {
  switch (action.type) {
    case "EDIT_USER": 
      return {
        ...prevState,
        selectedUser: action.user,
        userAction: UserActions.Edit,
      };
    case "DELETE_USER": 
      return {
        ...prevState,
        selectedUser: action.user,
        userAction: UserActions.Delete,
      };
    case 'SHOW_USER_INFO': 
      return {
        ...prevState,
        selectedUser: action.user,
        userAction: UserActions.Details,
      };
    case "CLOSE":
      return initialState;
    default:
      return prevState;
  }
};

const UsersTable = ({ users }) => {
  // We use useReducer for more complex state management
  const [userState, dispatch] = useReducer(reducer, initialState);

  // Editing an user
  const editClickHandler = (userId) => {
    userService.getUser(userId)
      .then((user) => dispatch({ type: "EDIT_USER", user }));
  };

  // Deleting an user
  const deleteClickHandler = (userId) => {
    userService.getUser(userId)
      .then((user) => dispatch({ type: "DELETE_USER", user }));
  };

  // We get and save the current user
  const detailsClickHandler = (userId) => {
    userService.getUser(userId)
      .then((user) => dispatch({ type: "SHOW_USER_INFO", user }));
  };

  // Closing the modal
  const closeHandler = () => dispatch({ type: "CLOSE", initialState });

  // Rendering the table rows
  const userRows = users.map((user) => (
    <UserRow 
      key={user._id} 
      user={user} 
      onEditClick={editClickHandler}
      onDeleteClick={deleteClickHandler}
      onDetailsClick={detailsClickHandler} 
    />
  ));

  return (
    <div className="table-wrapper">
      {/* Placing the modals in different div */}
      {/* Displaying User Edit when Edit button is clicked */}
      {userState.userAction === UserActions.Edit && 
        ReactDOM.createPortal(
          <UserEdit user={userState.selectedUser} onClose={closeHandler} />,
          document.getElementById("edit-modal")
        )
      }

      {/* Displaying User Delete when Delete button is clicked */}
      {userState.userAction === UserActions.Delete && 
        ReactDOM.createPortal(
          <UserDelete user={userState.selectedUser} onClose={closeHandler} />,
          document.getElementById("delete-modal")
        )
      }

      {/* Displaying User Details when Info button is clicked */}
      {userState.userAction === UserActions.Details && 
        ReactDOM.createPortal(
          <UserDetails user={userState.selectedUser} onClose={closeHandler} />,
          document.getElementById("info-modal")
        )
      }

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
