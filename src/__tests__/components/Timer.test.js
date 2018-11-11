import React from "react";
import Timer from "../../components/Timer";

import { shallow, mount } from "enzyme";

describe(`Timer`, () => {
  test(`initial render`, () => {
    const wrapper = shallow(<Timer />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("initial progress amount", () => {
    const wrapper = mount(<Timer />);
    expect(wrapper.find(".progress__container").find(".progress")).toHaveLength(
      3
    );
  });

  test("click Start Timer with input 10 seconds", () => {
    const wrapper = mount(<Timer />);

    wrapper.find("#timer-value").simulate("change", {
      target: {
        value: 10
      }
    });

    wrapper.find("#start-timer").simulate("click");
    console.log(wrapper.state());
    expect(wrapper.state("seconds")).toBe(10);
    expect(wrapper.state("initialSeconds")).toBe(10);
    expect(wrapper.state("timerIsRun")).toBe(true);
    expect(wrapper.find("#timer-value").prop('disabled')).toBe(true);
    expect(wrapper.find("#start-timer").prop('disabled')).toBe(true);
    expect(wrapper.find("#stop-timer").prop('disabled')).toBe(false);
  });
});
