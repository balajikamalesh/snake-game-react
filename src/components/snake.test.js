import React from "react";
import Enzyme, { shallow, render } from "enzyme";
import Snake from "./snake";

import ReactEighteenAdapter from "@cfaester/enzyme-adapter-react-18";
Enzyme.configure({ adapter: new ReactEighteenAdapter() });

describe("snake", () => {
  it("snake length", () => {
    let snakeArray = [...Array(5).keys()].map((x) => [0, 2 * x]);
    const wrapper = render(<Snake snakeSquares={snakeArray} />);
    const snakeLength = wrapper["0"].children.length;
    expect(snakeLength).toBe(5);
  });

  it("snake head", () => {
    let snakeArray = [...Array(5).keys()].map((x) => [0, 2 * x]);
    const wrapper = render(<Snake snakeSquares={snakeArray} />);
    const headClass =
      wrapper["0"].children[wrapper["0"].children.length - 1].attribs.class;
    expect(headClass).toBe("snake-head");
  });

  it("snake body", () => {
    let snakeArray = [...Array(5).keys()].map((x) => [0, 2 * x]);
    const wrapper = render(<Snake snakeSquares={snakeArray} />);
    const bodyClass = wrapper["0"].children[0].attribs.class;
    expect(bodyClass).toBe("snake-body-1");
  });
});
