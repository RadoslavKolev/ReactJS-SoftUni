import React, { useReducer, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import * as userService from "../../services/userService";
import { UserActions } from "../../actions/userActions";
import UserEdit from "./UserEdit/UserEdit";
import UserDelete from "./UserDelete/UserDelete";
import UserDetails from "./UserDetails/UserDetails";
import UserAdd from "./UserAdd/UserAdd";
import UserRow from "./UserRow/UserRow";
import DownArrowIcon from "../common/DownArrowIcon/DownArrowIcon";

const initialState = {
  selectedUser: null,
  userAction: null,
};

// Reducer function that runs for every dispatch on useReducer()
const reducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...prevState,
        selectedUser: null,
        userAction: UserActions.Add,
      };
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
    case "SHOW_USER_INFO":
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

const modal = document.getElementById("modal");

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  // We use useReducer for more complex state management
  const [userState, dispatch] = useReducer(reducer, initialState);

  // We use useEffect to prevent infinite loop (setUsers calls the component again)
  // We take the getAllUsers() and set them in the users state
  // This operation runs when the component is initially rendered
  useEffect(() => {
    userService.getAllUsers()
      .then(users => setUsers(users));
  }, []);

  // Adding an user
  const addClickHandler = () => {
    dispatch({ type: "ADD_USER" });
  };

  // Editing an user
  const editClickHandler = (userId) => {
    userService
      .getUser(userId)
      .then((user) => dispatch({ type: "EDIT_USER", user }));
  };

  // Deleting an user
  const deleteClickHandler = (userId) => {
    userService
      .getUser(userId)
      .then((user) => dispatch({ type: "DELETE_USER", user }));
  };

  // We get and save the current user
  const detailsClickHandler = (userId) => {
    userService
      .getUser(userId)
      .then((user) => dispatch({ type: "SHOW_USER_INFO", user }));
  };

  // Closing the modal
  const closeHandler = () => dispatch({ type: "CLOSE", initialState });

  // Adding user
  const userCreateHandler = (userData) => {
    userService.createUser(userData)
      .then((user) => {
        setUsers(prevUsers => [...prevUsers, user]);
        closeHandler();
      })
  };

  const deleteUserHandler = () => {
    userService.deleteUser(userState.selectedUser._id)
      .then(userId => {
        const updatedUsers = users.filter(user => user._id !== userId);
        setUsers(updatedUsers);
        closeHandler();
      });
  };

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
    <>
      <div className="table-wrapper">
        {/* Placing the modals in different div */}
        {/* Displaying User Edit when Edit button is clicked */}
        {userState.userAction === UserActions.Edit &&
          ReactDOM.createPortal(
            <UserEdit user={userState.selectedUser} onClose={closeHandler} />,
            modal
          )}

        {/* Displaying User Delete when Delete button is clicked */}
        {userState.userAction === UserActions.Delete &&
          ReactDOM.createPortal(
            <UserDelete
              onUserDelete={deleteUserHandler}
              onClose={closeHandler}
            />,
            modal
          )}

        {/* Displaying User Details when Info button is clicked */}
        {userState.userAction === UserActions.Details &&
          ReactDOM.createPortal(
            <UserDetails
              user={userState.selectedUser}
              onClose={closeHandler}
            />,
            modal
          )}

        {/* Displaying Add User when Create new user button is clicked */}
        {userState.userAction === UserActions.Add &&
          ReactDOM.createPortal(
            <UserAdd onUserCreate={userCreateHandler} onClose={closeHandler} />,
            modal
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

      <button className="btn-add btn" onClick={addClickHandler}>
        Add new user
      </button>
    </>
  );
};

export default UsersTable;
