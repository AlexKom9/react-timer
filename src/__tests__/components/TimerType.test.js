import React from "react";
import TimerType from "../../components/TimerType";
import { shallow, mount } from "enzyme";

describe(`TimerType`, () => {

  test(`initial reander`, () => {
    const wrapper = shallow(<TimerType setTimerType={() => {}} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("change input", () => {
    const value = "hours\nminutes\nseconds";
    const wrapper = mount(<TimerType setTimerType={()=> {}} />);
    const name = 'username';

    wrapper.find("input").simulate("change", {
      target: {
        name,
        value: "hours, minutes, seconds"
      }
    });

    expect(wrapper.find("textarea").props().value).toBe(value);
    // expect(wrapper.find("textarea").props().value).toBe(value);
    // debugger;
    console.log('option = ', wrapper.find("option[value='hours']").props());

  });
});


