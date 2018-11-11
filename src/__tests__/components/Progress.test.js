import React from "react";
import Progress from "../../components/Progress";

import { shallow } from "enzyme";

describe(`Progress`, () => {
  test(`initial render`, () => {
    const wrapper = shallow(
      <Progress
        Progress
        name="minutes"
        value={30}
        percent={50}
      />
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
