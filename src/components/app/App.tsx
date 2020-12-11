import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Header from "../header/Header";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "react-toast-notifications";

import { fetchStoreData } from "../../redux/Index";

import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStoreData());
  });

  const Main = lazy(() => import("../main/Main"));
  const Cart = lazy(() => import("../cart/Cart"));

  return (
    <div className="App">
      <ToastProvider>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path={`/`} component={Main} />
            <Route exact path={`/cart`} component={Cart} />
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
