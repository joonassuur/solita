import React from "react";
import { shallow } from "enzyme";

import Cart from "./Cart";
import { products } from "../../mockedAPI/products.json";
import { getCart, getProducts } from "../../redux/Selectors";
import StoreItems from "../store-items/StoreItems";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => mockDispatch,
}));
jest.mock("../../redux/Selectors");
getProducts.mockReturnValue(products);

describe("div #total-amount should only exist when cartQuantity is more than 0", () => {
  it("#total-amount should exist when cartQuantity is more than 0, #total-amount textcontent should be 'Total: 1798 €", () => {
    getCart.mockReturnValue({ cartQuantity: 2, cartTotalCost: 1798 });
    const component = shallow(<Cart></Cart>);
    expect(component.find("#total-amount")).toHaveLength(1);
    expect(component.find("#total-amount").text()).toEqual("Total: 1798 €");
  });

  it("#total-amount should not exist when cartQuantity is less than 1", () => {
    getCart.mockReturnValue({ cartQuantity: 0, cartTotalCost: 0 });
    const component = shallow(<Cart></Cart>);
    expect(component.find("#total-amount")).toHaveLength(0);
  });
});

it("Should match snapshot", () => {
  const props = {
    cartAction: "remove",
    buttonText: "Remove from cart",
    renderElement: "cart",
  };
  const testRenderer = shallow(
    <Cart>
      <StoreItems {...props} />
    </Cart>
  );
  expect(testRenderer).toMatchSnapshot();
});
