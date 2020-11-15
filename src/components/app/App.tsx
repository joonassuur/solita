import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Header from "../header/Header";
import Main from "../main/Main";
import Cart from "../cart/Cart";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "react-toast-notifications";

import { fetchStoreData } from "../../redux/Index";

import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStoreData());
  });

  return (
    <div className="App">
      <ToastProvider>
        <Header />
        <Switch>
          <Route exact path={`/`} render={() => <Main />} />
          <Route exact path={`/cart`} render={() => <Cart />} />
        </Switch>
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
