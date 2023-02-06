import React, { useEffect } from "react";

import { deleteUser } from "../../../services/userService";
import ActionButton from "../../common/ActionButton/ActionButton";

const UserDelete = ({ userId, onClose }) => {
  // If Esc key is pressed, the modal closes
  const handleKeyDown = (event) => {
    if (event.key === "Escape") onClose();
  };

  // Adds the handleKeyDown event handler to the document object when the component is mounted
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function that removes the event handler when the component is unmounted to prevent memory leaks
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const deleteUserHandler = () => {
    deleteUser(userId);
    onClose();
  };

  return (
    <div className="overlay">
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal">
        <div className="confirm-container">
          <header className="headers">
            <h2>Are you sure you want to delete this account?</h2>
            <ActionButton
              btnClass={"btn close"}
              btnTitle={"Close"}
              dataIcon={"xmark"}
              iconClasses={"svg-inline--fa fa-xmark"}
              viewBox={"0 0 320 512"}
              d={
                "M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
              }
              onClick={onClose}
            />
          </header>

          <div className="actions">
            <div id="form-actions">
              <button id="action-save" className="btn" type="submit" onClick={deleteUserHandler}>
                Delete
              </button>
              <button
                id="action-cancel"
                className="btn"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDelete;
