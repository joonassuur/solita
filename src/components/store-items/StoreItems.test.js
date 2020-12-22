import React from "react";
import { shallow } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import StoreItems from "./StoreItems";
import { getCart, getProducts } from "../../redux/Selectors";
import { addToCart, removeFromCart } from "../../redux/AppActions";
import { products } from "../../mockedAPI/products.json";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn(fn => fn()),
  useDispatch: () => mockDispatch
}));
jest.mock("../../redux/Selectors");
getCart.mockReturnValue([]);
getProducts.mockReturnValue(products);

describe("StoreItems Component", () => {
  // Initialize mockstore with empty state
  let initialState;
  let store;
  beforeEach(() => {
    initialState = {
      products: [],
      cart: []
    };
    store = mockStore(initialState)
  });

  it("should dispatch addToCart action", () => {
    // Dispatch the action
    store.dispatch(addToCart());

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = { type: "@app: addToCart" };
    expect(actions).toEqual([expectedPayload]);
  });

  it("should dispatch removeFromCart action", () => {
    // Dispatch the action
    store.dispatch(removeFromCart());

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = { type: "@app: removeFromCart" };
    expect(actions).toEqual([expectedPayload]);
  });

  it("Should match snapshot", () => {
    const props = {
      cartAction: "add",
      buttonText: "Add to Cart",
      renderElement: "products"
    };
    const testRenderer = shallow(<StoreItems {...props} />);
    expect(testRenderer).toMatchSnapshot();
  });

  it("Should match snapshot", () => {
    const props = {
      cartAction: "remove",
      buttonText: "Remove from Cart",
      renderElement: "cart"
    };
    const testRenderer = shallow(<StoreItems {...props} />);
    expect(testRenderer).toMatchSnapshot();
  });
});
