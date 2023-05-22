import React from "react";

export default (props) => {
  const { speed, highScore, currentScore } = props;
  return (
    <div>
      <h1>High Score: {highScore[speed]}</h1>
      <h1>Score: {currentScore} </h1>
    </div>
  );
};
