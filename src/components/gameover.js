import React from "react";

export default (props) => {
  const { isGameOver, reason } = props;
  if (isGameOver) {
    return (
      <div style={{ marginTop: "20px", border: "5px solid black" }}>
        <h1>☹ GAME OVER ☹</h1>
        <h3>{reason}</h3>
      </div>
    );
  } else {
    return <div></div>;
  }
};
