import React from "react";

export default (props) => {
  const { snakeSquares } = props;
  return (
    <div>
      {snakeSquares.map((dot, i) => {
        const style = {
          top: `${dot[0]}%`,
          left: `${dot[1]}%`,
        };
        if (i === snakeSquares.length - 1) {
          return <div className="snake-head" key={i} style={style}></div>;
        } else {
          if (i % 2 === 0) {
            return <div className="snake-body-1" key={i} style={style}></div>;
          } else {
            return <div className="snake-body-2" key={i} style={style}></div>;
          }
        }
      })}
    </div>
  );
};
