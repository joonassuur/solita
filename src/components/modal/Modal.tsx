import React from "react";
import ReactModal from "react-modal";

import { useSelector } from "react-redux";
import { getIsModalOpen } from "../../redux/Index";

import "./Modal.scss";
interface PropsInterface {
  handleModal: (route?: string) => void;
}

const Modal: React.FC<PropsInterface> = ({ handleModal }) => {
  const isModalOpen = useSelector(getIsModalOpen);

  return (
    <ReactModal
      id="modal-content"
      isOpen={isModalOpen}
      shouldCloseOnEsc={true}
      shouldFocusAfterRender={true}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0, 0.75)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          borderRadius: "0",
          border: "0",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "4em",
        },
      }}
    >
      <h1>Product has been added to cart</h1>
      <div className="buttons-container">
        <button className="backToStore" onClick={() => handleModal()}>
          Back to store
        </button>
        <button
          className="proceedCheckout"
          onClick={() => handleModal("contact")}
        >
          Proceed to checkout
        </button>
      </div>
    </ReactModal>
  );
};

export default Modal;
