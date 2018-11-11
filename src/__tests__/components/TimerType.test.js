import React from "react";
import TimerType from "../../components/TimerType";
import * as constants from "../../constants/constant";

import { shallow, mount} from "enzyme";

describe(`TimerType`, () => {

  test(`initial render`, () => {
    const wrapper = shallow(<TimerType setTimerType={() => {}} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("change input", () => {
    const value = "hours\nminutes\nseconds";
    const wrapper = mount(<TimerType setTimerType={()=> {}} />);

    wrapper.find("input").simulate("change", {
      target: {
        value: "hours, minutes, seconds"
      }
    });
    expect(wrapper.find("textarea").props().value).toBe(value);
    expect(wrapper.find("option[value='hours']").props().selected).toBe(true);
    expect(wrapper.find("option[value='minutes']").props().selected).toBe(true);
    expect(wrapper.find("option[value='seconds']").props().selected).toBe(true);
  });

  test("change textarea", () => {

    const value = ['HOURS', 'Minutes', 'seConds'];
    const wrapper = mount(<TimerType setTimerType={()=> {}} />);

    wrapper.find("textarea").simulate("change", {
      target: {
        value: value.join('\n')
      }
    });
    expect(wrapper.find("input").props().value).toBe(value.join(', '));
    expect(wrapper.find("option[value='hours']").props().selected).toBe(true);
    expect(wrapper.find("option[value='minutes']").props().selected).toBe(true);
    expect(wrapper.find("option[value='seconds']").props().selected).toBe(true);
  });
});


