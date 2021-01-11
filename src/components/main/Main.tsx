import React, { useEffect } from "react";
import StoreItems from "../store-items/StoreItems";
import Modal from "../modal/Modal";
import "./Main.scss";
interface PropsInterface {
  handleModal: (route?: string) => void;
}

const Main: React.FC<PropsInterface> = ({ handleModal }) => {
  useEffect(() => {
    document.title = "whee web store - Main";
  }, []);

  return (
    <div>
      <Modal handleModal={handleModal} />
      <div id="main">{StoreItems("add", "Add to cart", "products")}</div>
    </div>
  );
};

export default Main;
