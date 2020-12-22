import React from "react";
import { shallow } from "enzyme";

import Main from './Main'
import { products } from "../../mockedAPI/products.json";
import { getCart, getProducts } from "../../redux/Selectors";
import StoreItems from '../store-items/StoreItems'


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
    cartAction: "add",
    buttonText: "Add to cart",
    renderElement: "products"
  };
  const testRenderer = shallow(<Main><StoreItems {...props} /></Main>);
  expect(testRenderer).toMatchSnapshot();
});