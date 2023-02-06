import React from "react";

import Icon from "../../../../common/Icon/Icon";

const ActionButton = (props) => {
  const { btnClass, btnTitle, dataIcon, iconClasses, viewBox, d } = props;

  return (
    <button className={btnClass} title={btnTitle}>
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
