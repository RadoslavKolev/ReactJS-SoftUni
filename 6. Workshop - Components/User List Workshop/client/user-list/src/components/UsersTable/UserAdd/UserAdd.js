import React, { useEffect, useState } from "react";

import ActionButton from "../../common/ActionButton/ActionButton";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const imageUrlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*.(jpeg|jpg|png|gif))/i;

const UserAdd = ({ onUserCreate, onClose }) => {
  const [errors, setErrors] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    imageUrl: true,
    country: true,
    city: true,
    street: true,
    streetNumber: true,
  });

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    imageUrl: "",
    country: "",
    city: "",
    street: "",
    streetNumber: "",
  });

  const changeHandler = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phoneNumber, imageUrl, ...address } =
      formValues;
    const userData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      imageUrl,
      address,
    }; // Object
    onUserCreate(userData);
  };

  const minLength = (event, bound) => {
    if (formValues[event.target.name].length < bound) {
      setErrors((prevState) => ({
        ...prevState,
        [event.target.name]: true,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [event.target.name]: false,
      }));
    }
  };

  const checkRegex = (e, regex) => {
    if (!regex.test(formValues[e.target.name])) {
      setErrors((prevState) => ({
        ...prevState,
        [e.target.name]: true,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [e.target.name]: false,
      }));
    }
  };

  const checkPhoneNumber = (e) => {
    if (formValues[e.target.name].length !== 10) {
      setErrors((prevState) => ({
        ...prevState,
        [e.target.name]: true,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [e.target.name]: false,
      }));
    }
  };

  const isPositive = (e) => {
    const number = Number(e.target.value);

    if (number <= 0) {
      setErrors((prevState) => ({
        ...prevState,
        [e.target.name]: true,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [e.target.name]: false,
      }));
    }
  };

  const checkIfValid = () => {
    return (
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.phoneNumber ||
      errors.imageUrl ||
      errors.country ||
      errors.city ||
      errors.street ||
      errors.streetNumber
    );
  };

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

  return (
    <div className="overlay">
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal">
        <div className="user-container">
          <header className="headers">
            <h2>Add User</h2>
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

          <form onSubmit={submitHandler}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <div className="input-wrapper">
                  <span>
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={!errors.firstName ? 'input-correct' : ''}
                    value={formValues.firstName}
                    onChange={(e) => {
                      changeHandler(e);
                      minLength(e, 3);
                    }}
                    onBlur={(e) => minLength(e, 3)}
                  />
                </div>
                {errors.firstName && (
                  <p className="form-error">
                    First name should be at least 3 characters long!
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <div className="input-wrapper">
                  <span>
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={!errors.lastName ? 'input-correct' : ''}
                    value={formValues.lastName}
                    onChange={(e) => {
                      changeHandler(e);
                      minLength(e, 3);
                    }}
                    onBlur={(e) => minLength(e, 3)}
                  />
                </div>
                {errors.lastName && (
                  <p className="form-error">
                    Last name should be at least 3 characters long!
                  </p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <span>
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className={!errors.email ? 'input-correct' : ''}
                    value={formValues.email}
                    onChange={(e) => {
                      changeHandler(e);
                      checkRegex(e, emailRegex);
                    }}
                    onBlur={(e) => checkRegex(e, emailRegex)}
                  />
                </div>
                {errors.email && (
                  <p className="form-error">Email is not valid!</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone number</label>
                <div className="input-wrapper">
                  <span>
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    className={!errors.phoneNumber ? 'input-correct' : ''}
                    value={formValues.phoneNumber}
                    onChange={(e) => {
                      changeHandler(e);
                      checkPhoneNumber(e);
                    }}
                    onBlur={(e) => checkPhoneNumber(e)}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="form-error">Phone number is not valid!</p>
                )}
              </div>
            </div>

            <div className="form-group long-line">
              <label htmlFor="imageUrl">Image Url</label>
              <div className="input-wrapper">
                <span>
                  <i className="fa-solid fa-image"></i>
                </span>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="text"
                  className={!errors.imageUrl ? 'input-correct' : ''}
                  value={formValues.imageUrl}
                  onChange={(e) => {
                    changeHandler(e);
                    checkRegex(e, imageUrlRegex);
                  }}
                  onBlur={(e) => checkRegex(e, imageUrlRegex)}
                />
              </div>
              {errors.imageUrl && (
                <p className="form-error">ImageUrl is not valid!</p>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <div className="input-wrapper">
                  <span>
                    <i className="fa-solid fa-map"></i>
                  </span>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    className={!errors.country ? 'input-correct' : ''}
                    value={formValues.country}
                    onChange={(e) => {
                      changeHandler(e);
                      minLength(e, 2);
                    }}
                    onBlur={(e) => minLength(e, 2)}
                  />
                </div>
                {errors.country && (
                  <p className="form-error">
                    Country should be at least 2 characters long!
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <div className="input-wrapper">
                  <span>
                    <i className="fa-solid fa-city"></i>
                  </span>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className={!errors.city ? 'input-correct' : ''}
                    value={formValues.city}
                    onChange={(e) => {
                      changeHandler(e);
                      minLength(e, 3);
                    }}
                    onBlur={(e) => minLength(e, 3)}
                  />
                </div>
                {errors.city && (
                  <p className="form-error">
                    City should be at least 3 characters long!
                  </p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="street">Street</label>
                <div className="input-wrapper">
                  <span>
                    <i className="fa-solid fa-map"></i>
                  </span>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    className={!errors.street ? 'input-correct' : ''}
                    value={formValues.street}
                    onChange={(e) => {
                      changeHandler(e);
                      minLength(e, 3);
                    }}
                    onBlur={(e) => minLength(e, 3)}
                  />
                </div>
                {errors.street && (
                  <p className="form-error">
                    Street should be at least 3 characters long!
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="streetNumber">Street number</label>
                <div className="input-wrapper">
                  <span>
                    <i className="fa-solid fa-house-chimney"></i>
                  </span>
                  <input
                    id="streetNumber"
                    name="streetNumber"
                    type="text"
                    className={!errors.streetNumber ? 'input-correct' : ''}
                    value={formValues.streetNumber}
                    onChange={(e) => {
                      changeHandler(e);
                      isPositive(e);
                    }}
                    onBlur={(e) => isPositive(e)}
                  />
                </div>
                {errors.streetNumber && (
                  <p className="form-error">
                    Street number should be a positive number!
                  </p>
                )}
              </div>
            </div>

            <div id="form-actions">
              <button
                id="action-save"
                className={`btn ${checkIfValid() ? "btn-disabled" : ""}`}
                type="submit"
                disabled={checkIfValid()}
              >
                Add
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAdd;
