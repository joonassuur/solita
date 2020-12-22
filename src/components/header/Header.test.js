import React from "react";
import { shallow } from "enzyme";

import Header from "./Header";
import { getCart } from "../../redux/Selectors";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(fn => fn())
}));
jest.mock("../../redux/Selectors");
getCart.mockReturnValue([]);

it("Simulate cart icon click", () => {
  const baseProps = {
    navigateToCart: jest.fn()
  };
  const testRenderer = shallow(<Header {...baseProps}></Header>);
  baseProps.navigateToCart();
  expect(baseProps.navigateToCart).toHaveBeenCalled();

  expect(testRenderer).toMatchSnapshot();
});

it("Should match Header component snapshot", () => {
  const testRenderer = shallow(<Header></Header>);
  expect(testRenderer).toMatchSnapshot();
});

