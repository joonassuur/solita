import React from "react";
import { shallow, mount } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import StoreItems from "./StoreItems";
import Cart from "../cart/Cart";
import { getCart, getProducts } from "../../redux/Selectors";
import { addToCart } from "../../redux/AppActions";
import { products } from "../../mockedAPI/products.json";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => mockDispatch,
}));
jest.mock("../../redux/Selectors");
getCart.mockReturnValue({ cartQuantity: 2, cart: [{ id: 2, quantity: 2 }] });
getProducts.mockReturnValue(products);

describe("StoreItems Component", () => {
  // Initialize mockstore
  let initialState;
  let store;
  beforeEach(() => {
    initialState = {
      products: [products],
      cart: [getCart().cart],
    };
    store = mockStore(initialState);
  });

  it("should dispatch addToCart action on 'Add to cart' button click and increment 'id: 2' quantity from 2 to 3", () => {
    const props = {
      ...getCart(),
      cartAction: "add",
      buttonText: "Add to cart",
      renderElement: "products",
    };
    const component = shallow(<StoreItems {...props} />);
    const addOrRemoveItem = jest.fn();
    // Simulate the 'Add to cart' button click
    component.find(".addRemove-btn").at(1).simulate("click", addOrRemoveItem());
    // Dispatch the action
    store.dispatch(addToCart([{ id: 2, quantity: 3 }]));
    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = {
      type: "@app: addToCart",
      payload: [{ id: 2, quantity: 3 }],
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it("should dispatch removeFromCart action on 'Remove from cart' button click and decrement 'id: 2' quantity from 2 to 1", () => {
    const props = {
      ...getCart(),
      cartAction: "remove",
      buttonText: "Remove from cart",
      renderElement: "cart",
    };
    const component = shallow(<StoreItems {...props} />);
    const addOrRemoveItem = jest.fn();
    // Simulate the 'Remove from cart' button click
    component.find(".addRemove-btn").at(1).simulate("click", addOrRemoveItem());
    // Dispatch the action
    store.dispatch(addToCart([{ id: 2, quantity: 1 }]));
    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = {
      type: "@app: addToCart",
      payload: [{ id: 2, quantity: 1 }],
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it(".product-name class at iteration 1 should render Rectangle item name", () => {
    const props = {
      ...getCart(),
      cartAction: "add",
      buttonText: "Add to cart",
      renderElement: "products",
    };
    const component = shallow(<StoreItems {...props} />);
    expect(component.find(".product-name").at(1).text()).toEqual("Rectangle");
  });

  it(".product-quantity class at iteration 1 should render Quantity: 2", () => {
    const component = mount(
      <Cart>
        {StoreItems("remove", "Remove from cart", "cart")}
      </Cart>
    );
    expect(component.find(".product-quantity").text()).toEqual("Quantity: 2");
  });

  // it("Should match snapshot with cart view props", () => {
  //   const props = {
  //     cartAction: "add",
  //     buttonText: "Add to cart",
  //     renderElement: "products"
  //   };
  //   const testRenderer = shallow(<StoreItems {...props} />);
  //   expect(testRenderer).toMatchSnapshot();
  // });

  // it("Should match snapshot with remove from cart props", () => {
  //   const props = {
  //     cartAction: "remove",
  //     buttonText: "Remove from cart",
  //     renderElement: "cart"
  //   };
  //   const testRenderer = shallow(<StoreItems {...props} />);
  //   expect(testRenderer).toMatchSnapshot();
  // });
});
