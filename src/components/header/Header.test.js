import React from "react";
import { shallow } from "enzyme";

import Header from "./Header";
import { getCart } from "../../redux/Selectors";

jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) => fn()),
}));
jest.mock("../../redux/Selectors");
getCart.mockReturnValue({ cartQuantityString: 2, cartTotalCost: 1798 });

describe("Header Component", () => {
  const component = shallow(<Header {...getCart}></Header>);

  it("Should simulate cart icon click", () => {
    const navigateToCart = jest.fn();
    component.find(".cart-icon").simulate("click", navigateToCart());
    expect(navigateToCart).toBeCalled();
  });

  it("Should display .cart-quantity element text output as '2'", () => {
    expect(component.find(".cart-quantity").text()).toEqual("2");
  });

  it("Should display .cart-cost element text output as 'Total: 1798 €'", () => {
    expect(component.find(".cart-cost").text()).toEqual("Total: 1798 €");
  });

  it("Should match Header component snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
