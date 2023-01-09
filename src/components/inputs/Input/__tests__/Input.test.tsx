import React from "react";
import { shallow } from "enzyme";

import { Input } from "../index";

describe("Input component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Input />);
    expect(wrapper).toBeTruthy();
  });
});
