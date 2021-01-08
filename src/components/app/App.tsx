import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

import { ToastContainer } from "react-toastify";
import { ToastProvider } from "react-toast-notifications";

import Header from "../header/Header";
import { fetchStoreData, toggleModal } from "../../redux/Index";

import "./App.scss";

function App() {
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(2);

  const dispatch = useDispatch();
  const history = useHistory();

  const Main = lazy(() => import("../main/Main"));
  const Cart = lazy(() => import("../cart/Cart"));
  const Contact = lazy(() => import("../contact/Contact"));

  const handleNavigateToCart = () => {
    history.push("/cart");
  };
  const handleNavigateToStore = () => {
    history.push("/");
  };
  const handleModal = (route?: string) => {
    if (route === "contact") {
      history.push("/contact");
    }
    dispatch(toggleModal(false));
  };

  useEffect(() => {
    dispatch(fetchStoreData());
  }, [dispatch]);

  return (
    <div className="App">
      <button id="skipto" {...buttonProps}>
        Skip to
      </button>
      <div
        className={`accessible-menu ${isOpen ? "visible" : ""} `}
        role="menu"
      >
        <a {...itemProps[0]} href="/#" onKeyPress={handleNavigateToStore}>
          Store
        </a>
        <a {...itemProps[1]} href="/#" onKeyPress={handleNavigateToCart}>
          Cart
        </a>
      </div>
      <ToastProvider>
        <Header
          navigateToCart={handleNavigateToCart}
          navigateToStore={handleNavigateToStore}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
              exact
              path={`/`}
              render={() => <Main handleModal={handleModal} />}
            />
            <Route
              exact
              path={`/cart`}
              render={() => <Cart navigateToStore={handleNavigateToStore} />}
            />
            <Route
              exact
              path={`/contact`}
              render={() => <Contact navigateToCart={handleNavigateToCart} />}
            />
          </Switch>
        </Suspense>
        <ToastContainer
          position="bottom-center"
          hideProgressBar={false}
          autoClose={1500}
          pauseOnFocusLoss={false}
        />
      </ToastProvider>
    </div>
  );
}

export default App;
