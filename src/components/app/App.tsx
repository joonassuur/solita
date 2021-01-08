import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "react-toast-notifications";

import Header from "../header/Header";
import { fetchStoreData, toggleModal } from "../../redux/Index";

import SkipTo from "../skipTo/SkipTo";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const Main = lazy(() => import("../main/Main"));
  const Cart = lazy(() => import("../cart/Cart"));
  const Contact = lazy(() => import("../contact/Contact"));

  const handleNavigateToStore = () => {
    history.push("/");
  };
  const handleNavigateToCart = () => {
    history.push("/cart");
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
      <SkipTo />
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
