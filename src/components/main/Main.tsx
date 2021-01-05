import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIsModalOpen, toggleModal } from "../../redux/Index";
import StoreItems from "../store-items/StoreItems";
import Modal from "../modal/Modal";
import "./Main.scss";

function Main() {
  const isModalOpen = useSelector(getIsModalOpen);
  const dispatch = useDispatch();

  const handleModal = (e: string) => {
    dispatch(toggleModal(false));
  };

  return (
    <div>
      {isModalOpen && <Modal handleModal={handleModal} />}
      <div id="main">{StoreItems("add", "Add to cart", "products")}</div>
    </div>
  );
}

export default Main;
