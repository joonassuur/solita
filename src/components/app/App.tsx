import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Header from "../header/Header";
import Main from "../main/Main";
import Cart from "../cart/Cart";

import { fetchStoreData } from "../../redux/Index";

import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStoreData());
  });

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={`/`} render={() => <Main />} />
        <Route exact path={`/cart`} render={() => <Cart />} />
      </Switch>
    </div>
  );
}

export default App;
