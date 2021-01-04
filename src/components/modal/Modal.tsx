import React from "react";
import "./Modal.scss";

function Modal({ handleModal }: { handleModal: React.MouseEventHandler }) {
  return (
    <div id="modal-container">
      <div className="modal-close-button">
        <span className="material-icons" onClick={handleModal}>clear</span>
      </div>
      <div id="modal-content">
        <h1>Product has been added to cart</h1>
        <div className="buttons-container">
          <button className="backToStore" onClick={handleModal}>
            Back to store
          </button>
          <button className="proceedCheckout" onClick={handleModal}>
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
