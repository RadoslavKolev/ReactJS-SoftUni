import React from 'react';

const ActionButton = (props) => {
  const { btnClass, btnTitle, dataIcon, iconClasses, viewBox, d } = props;

  return (
    <button className={btnClass} title={btnTitle}>
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
      </button>
  );
};

export default ActionButton;