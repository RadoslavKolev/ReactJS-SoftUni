import React from "react";

const Icon = ({ dataIcon, iconClasses, viewBox, d }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon={dataIcon}
      className={iconClasses}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
    >
      <path fill="currentColor" d={d}></path>
    </svg>
  );
};

export default Icon;
