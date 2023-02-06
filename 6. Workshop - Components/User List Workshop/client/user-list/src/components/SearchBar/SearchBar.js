import React from "react";

import Icon from "../common/Icon/Icon";

const SearchBar = () => {
  return (
    <form className="search-form">
      <h2>
        <Icon
          dataIcon={"user"}
          className={"svg-inline--fa fa-user SearchBar_icon__cXpTg"}
          viewBox={"0 0 448 512"}
          d={
            "M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
          }
        />
        <span>Users</span>
      </h2>

      <div className="search-input-container">
        <input
          type="text"
          placeholder="Please, select the search criteria"
          name="search"
        />
        {/* TODO: Show the clear button only if input field length !== 0 */}
        <button className="btn close-btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <button className="btn" title="Please, select the search criteria">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div className="filter">
        <span>Search Criteria:</span>
        <select name="criteria" className="criteria">
          <option>Not selected</option>
          <option>First Name</option>
          <option>Last Name</option>
          <option>Email</option>
          <option>Phone</option>
        </select>
      </div>
    </form>
  );
};

export default SearchBar;
