import React, { useState, useEffect } from "react";
import Snake from "./components/snake";
import Bait from "./components/bait";
import Obstacles1 from "./components/obstacle";
import Obstacles2 from "./components/obstacle";
import Obstacles3 from "./components/obstacle";
import Obstacles4 from "./components/obstacle";
import Obstacles5 from "./components/obstacle";
import Score from "./components/score";
import DifficultyLevel from "./components/difficultylevel";
import Instructions from "./components/instructions";
import GameOver from "./components/gameover";
import { getRandomPositionForBait } from "./utils/getRandomPositionForBait";
import { getRandomPositionForObstacle } from "./utils/getRandomPositionForObstacle";
import { debounce } from "./utils/debounce";
import { difficultySpeedMap } from "./utils/difficultySpeed";

function App() {
  const [bait, setBait] = useState(getRandomPositionForBait());
  const [obstacles1, setObstacles1] = useState(getRandomPositionForObstacle());
  const [obstacles2, setObstacles2] = useState(getRandomPositionForObstacle());
  const [obstacles3, setObstacles3] = useState(getRandomPositionForObstacle());
  const [obstacles4, setObstacles4] = useState(getRandomPositionForObstacle());
  const [obstacles5, setObstacles5] = useState(getRandomPositionForObstacle());
  const [speed, setSpeed] = useState(2);
  const [direction, setDirection] = useState("R");
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("");
  const [isNear, setIsNear] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });
  const [snake, setSnake] = useState(
    [...Array(5).keys()].map((x) => [0, 2 * x])
  );

  useEffect(() => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }, []);

  useEffect(() => {
    document.onkeydown = debounce(onKeyDown, 200 / speed);

    if (speed !== 0 && !isGameOver) {
      window.myTimer = setInterval(moveSnake, 200 / speed);
    }

    let headOfSnake = snake[snake.length - 1];
    if (
      (headOfSnake[0] > 98 ||
        headOfSnake[1] > 98 ||
        headOfSnake[0] < 0 ||
        headOfSnake[1] < 0) &&
      !isGameOver
    ) {
      gameOver("Boundary Collision!!!");
    }

    return () => clearInterval(window.myTimer);
  }, [direction, isGameOver, speed, onKeyDown, snake]);

  function onKeyDown(event) {
    if (event.keyCode === 38 && direction !== "D") setDirection("U");
    if (event.keyCode === 39 && direction !== "L") setDirection("R");
    if (event.keyCode === 40 && direction !== "U") setDirection("D");
    if (event.keyCode === 37 && direction !== "R") setDirection("L");
  }

  function moveSnake() {
    let snakeArray = [...snake];
    let headOfSnake = snakeArray[snakeArray.length - 1];
    if (direction === "R") headOfSnake = [headOfSnake[0], headOfSnake[1] + 2];
    else if (direction === "L")
      headOfSnake = [headOfSnake[0], headOfSnake[1] - 2];
    else if (direction === "D")
      headOfSnake = [headOfSnake[0] + 2, headOfSnake[1]];
    else headOfSnake = [headOfSnake[0] - 2, headOfSnake[1]];

    //self collision
    if (JSON.stringify(snakeArray).indexOf(JSON.stringify(headOfSnake)) >= 0) {
      gameOver("Self Collision!!!");
    }

    if (
      JSON.stringify(obstacles1).indexOf(JSON.stringify(headOfSnake)) >= 0 ||
      JSON.stringify(obstacles2).indexOf(JSON.stringify(headOfSnake)) >= 0 ||
      JSON.stringify(obstacles3).indexOf(JSON.stringify(headOfSnake)) >= 0 ||
      JSON.stringify(obstacles4).indexOf(JSON.stringify(headOfSnake)) >= 0 ||
      JSON.stringify(obstacles5).indexOf(JSON.stringify(headOfSnake)) >= 0
    ) {
      gameOver("Obstacle Collision!!!");
    }

    snakeArray.push(headOfSnake);
    snakeArray.shift();

    if (
      Math.abs(bait[0] - headOfSnake[0]) < 15 &&
      Math.abs(bait[1] - headOfSnake[1]) < 15
    ) {
      setIsNear(true);
    } else {
      setIsNear(false);
    }

    //found
    if (bait[0] === headOfSnake[0] && bait[1] === headOfSnake[1]) {
      snakeArray.push(headOfSnake);
      setSnake(snakeArray);
      setBait(getRandomPositionForBait());
      setScore(score + 1);
      setHighScore({
        ...highScore,
        [speed]: Math.max(highScore[speed], score + 1),
      });
    }

    setSnake(snakeArray);
  }

  function setSpeedOfSnake(difficulty) {
    setSpeed(difficultySpeedMap[difficulty]);
  }

  function gameOver(reason) {
    clearInterval(window.myTimer);
    setIsGameOver(true);
    setGameOverReason(reason);
  }

  function reset() {
    setBait(getRandomPositionForBait());
    setSnake([...Array(5).keys()].map((x) => [0, 2 * x]));
    setDirection("R");
    setIsGameOver(false);
    setIsNear(false);
    setScore(0);
    setObstacles1(getRandomPositionForObstacle());
    setObstacles2(getRandomPositionForObstacle());
    setObstacles3(getRandomPositionForObstacle());
    setObstacles4(getRandomPositionForObstacle());
    setObstacles5(getRandomPositionForObstacle());
  }

  return (
    <div>
      <h1>SNAKE MANIA</h1>
      <div className="game-layout">
        <Snake snakeSquares={snake} />
        <Obstacles1 positions={obstacles1} />
        <Obstacles2 positions={obstacles2} />
        <Obstacles3 positions={obstacles3} />
        <Obstacles4 positions={obstacles4} />
        <Obstacles5 positions={obstacles5} />
        <Bait dot={bait} isNear={isNear} />
      </div>
      <div className="information">
        <Score currentScore={score} highScore={highScore} speed={speed} />
        <DifficultyLevel handler={setSpeedOfSnake} />
        <div style={{ marginLeft: "200px" }}>
          <button onClick={() => reset()}>Reset</button>
        </div>
        <Instructions />
        <GameOver isGameOver={isGameOver} reason={gameOverReason} />
      </div>
    </div>
  );
}

export default App;
