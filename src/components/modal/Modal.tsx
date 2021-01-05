import React from "react";
import "./Modal.scss";
interface PropsInterface {
  handleModal: (e:string) => void;
}

const Modal: React.FC<PropsInterface> = ({handleModal}) => {
  return (
    <div id="modal-container">
      <div className="modal-close-button">
        <span className="material-icons" onClick={() => handleModal("")}>
          clear
        </span>
      </div>
      <div id="modal-content">
        <h1>Product has been added to cart</h1>
        <div className="buttons-container">
          <button className="backToStore" onClick={() => handleModal("")}>
            Back to store
          </button>
          <button
            className="proceedCheckout"
            onClick={() => handleModal("checkout")}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
