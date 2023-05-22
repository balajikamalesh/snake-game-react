import React from "react";

export default (props) => {
  const { positions } = props;
  return (
    <div>
      {positions.map((dot, i) => {
        const style = {
          top: `${dot[0]}%`,
          left: `${dot[1]}%`,
        };
        return <div className="obstacle" key={i} style={style}></div>;
      })}
    </div>
  );
};
