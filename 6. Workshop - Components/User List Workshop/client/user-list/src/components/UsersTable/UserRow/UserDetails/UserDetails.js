import React, { useEffect } from "react";

import { formatDetailsDate } from "../../../../functions/dateFormatter";
import ActionButton from "../UserActions/ActionButton/ActionButton";

const UserDetails = ({ user, onClose }) => {
  const blankProfileUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  const createdAt = formatDetailsDate(user.createdAt);
  const updatedAt = formatDetailsDate(user.updatedAt);

  // If Esc key is pressed, the modal closes
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') onClose();
  };

  // Adds the handleKeyDown event handler to the document object when the component is mounted
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function that removes the event handler when the component is unmounted to prevent memory leaks
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="overlay">
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal">
        <div className="detail-container">
          <header className="headers">
            <h2>User Details</h2>
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

          <div className="content">
            <div className="image-container">
              <img
                src={user.imageUrl || blankProfileUrl}
                alt={`${user.firstName}'s profile`}
                className="image"
              />
            </div>
            <div className="user-details">
              <p>
                User Id: <strong>{user._id}</strong>
              </p>
              <p>
                Full Name:
                <strong>
                  {user.firstName} {user.lastName}
                </strong>
              </p>
              <p>
                Email: <strong>{user.email}</strong>
              </p>
              <p>
                Phone Number: <strong>{user.phoneNumber}</strong>
              </p>
              <p>
                Address:{" "}
                <strong>
                  {user.address.country}, {user.address.city},{" "}
                  {user.address.street} {user.address.streetNumber}
                </strong>
              </p>
              <p>
                Created on: <strong>{createdAt}</strong>
              </p>
              <p>
                Modified on: <strong>{updatedAt}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
