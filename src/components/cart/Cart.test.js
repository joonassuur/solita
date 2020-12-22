import React from "react";
import { shallow } from "enzyme";

import Cart from "./Cart";
import { products } from "../../mockedAPI/products.json";
import { getCart, getProducts } from "../../redux/Selectors";
import StoreItems from "../store-items/StoreItems";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn(fn => fn()),
  useDispatch: () => mockDispatch
}));
jest.mock("../../redux/Selectors");
getCart.mockReturnValue([]);
getProducts.mockReturnValue(products);

it("Should match snapshot", () => {
  const props = {
    cartAction: "remove",
    buttonText: "Remove from cart",
    renderElement: "cart"
  };
  const testRenderer = shallow(
    <Cart>
      <StoreItems {...props} />
    </Cart>
  );
  expect(testRenderer).toMatchSnapshot();
});
