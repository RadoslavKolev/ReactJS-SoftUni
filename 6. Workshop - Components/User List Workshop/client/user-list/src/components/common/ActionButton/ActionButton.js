import React from "react";

import Icon from "../Icon/Icon";

const ActionButton = (props) => {
  const { btnClass, btnTitle, dataIcon, iconClasses, viewBox, d, onClick } =
    props;

  return (
    <button className={btnClass} title={btnTitle} onClick={onClick}>
      <Icon
        dataIcon={dataIcon}
        className={iconClasses}
        viewBox={viewBox}
        d={d}
      />
    </button>
  );
};

export default ActionButton;
