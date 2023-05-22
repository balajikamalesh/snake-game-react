import React from "react";
import Enzyme, { shallow, render } from "enzyme";
import Bait from "./bait";
import ReactEighteenAdapter from "@cfaester/enzyme-adapter-react-18";

Enzyme.configure({ adapter: new ReactEighteenAdapter() });

describe("bait", () => {
  it("bait position", () => {
    let baitPos = [20, 30];
    const wrapper = shallow(<Bait dot={baitPos} isNear={true} />);
    const style = wrapper.find("div").prop("style");
    expect(style).toHaveProperty("top", "20%");
    expect(style).toHaveProperty("left", "30%");
  });
});
