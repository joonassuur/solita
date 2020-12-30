import React from "react";
import thunk from "redux-thunk";

import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { Route, Switch } from "react-router-dom";

import Main from "../main/Main";
import Cart from "../cart/Cart";
import { getCart, getProducts } from "../../redux/Selectors";
import { products } from "../../mockedAPI/products.json";

const middlewares = [thunk];
configureStore(middlewares);

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../redux/Selectors");
getCart.mockReturnValue({ cartQuantity: 0, cart: [] });
getProducts.mockReturnValue(products);

describe("Render correct component based on route", () => {
  it("should render Main component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </MemoryRouter>
    );

    expect(wrapper.find(Main)).toHaveLength(1);
  });

  it("should render Cart component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/cart"]}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </MemoryRouter>
    );

    expect(wrapper.find(Cart)).toHaveLength(1);
  });
});
