import React from "react";

export default (props) => {
  const { handler } = props;
  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <h1>Difficulty Level</h1>
      <form>
        <div className="radio-toolbar">
          <input
            type="radio"
            id="easy"
            onClick={() => handler("easy")}
            name="difficulty"
          />
          <label htmlFor="easy">Easy</label>
          <input
            type="radio"
            id="medium"
            onClick={() => handler("medium")}
            name="difficulty"
            checked
          />
          <label htmlFor="easy">Medium</label>
          <input
            type="radio"
            id="hard"
            onClick={() => handler("hard")}
            name="difficulty"
          />
          <label htmlFor="easy">
            <span></span>Hard
          </label>
          <input
            type="radio"
            id="pesto"
            onClick={() => handler("pesto")}
            name="difficulty"
          />
          <label htmlFor="easy">
            <span></span>PESTO
          </label>
        </div>
      </form>
    </div>
  );
};
