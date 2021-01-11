import React, { useEffect, lazy, Suspense, useRef } from "react";
import { useDispatch } from "react-redux";
import ReactModal from "react-modal";
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
    //Required by ReactModal plugin. Set app element, so the modal would know which elements to ignore if tab is pressed when modal is active.
    ReactModal.setAppElement('body')
    
    // fetch store data at app startup
    dispatch(fetchStoreData());
  }, [dispatch]);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleSkipToContent = () => {
    const currentContentRef = contentRef.current;
    if (currentContentRef) {
      currentContentRef.focus();
    }
  };

  return (
    <div className="App">
      <SkipTo skipToContent={handleSkipToContent} />
      <ToastProvider>
        <Header
          navigateToCart={handleNavigateToCart}
          navigateToStore={handleNavigateToStore}
        />
        <div id="content" tabIndex={0} ref={contentRef}>
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
        </div>
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
