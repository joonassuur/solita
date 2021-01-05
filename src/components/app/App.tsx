import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from "../header/Header";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "react-toast-notifications";

import { fetchStoreData } from "../../redux/Index";

import "./App.scss";

function App() {
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

  useEffect(() => {
    dispatch(fetchStoreData());
  });

  return (
    <div className="App">
      <ToastProvider>
        <Header navigateToCart={handleNavigateToCart} />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path={`/`} component={Main} />
            <Route
              exact
              path={`/cart`}
              render={() => <Cart navigateToStore={handleNavigateToStore} />}
            />
            <Route exact path={`/contact`} component={Contact} />
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
