import React from "react";

export default (props) => {
  const { dot, isNear } = props;

  const style = {
    top: `${dot[0]}%`,
    left: `${dot[1]}%`,
  };

  if (isNear) {
    return (
      <div
        className="snake-bait"
        style={style}
        data-tooltip="AGHHH!!! DON'T EAT ME!!!"
      ></div>
    );
  } else {
    return <div className="snake-bait-far" style={style}></div>;
  }
};
