import React from "react";
import { shallow } from "enzyme";

import Modal from './Modal';

it("Should match snapshot", () => {
  const component = shallow(<Modal></Modal>);
  expect(component).toMatchSnapshot();
});