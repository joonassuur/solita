import React from "react";
import { shallow } from "enzyme";

import Header from "./Header";
import { getCart } from "../../redux/Selectors";


jest.mock("react-redux", () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock("../../redux/Selectors");
getCart.mockReturnValue([]);



it("Should match snapshot", () => {
  const testRenderer = shallow(<Header></Header>);
  expect(testRenderer).toMatchSnapshot();
});
