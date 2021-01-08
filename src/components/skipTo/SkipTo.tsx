import React from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

import './SkipTo.scss'
interface PropsInterface {
  handleNavigateToStore: () => void;
  handleNavigateToCart: () => void;
}

const SkipTo: React.FC<PropsInterface> = ({
  handleNavigateToStore,
  handleNavigateToCart,
}) => {
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(2);

  return (
    <>
      <button id="skipto" {...buttonProps}>
        Skip to
      </button>
      <div
        className={`accessible-menu ${isOpen ? "visible" : ""} `}
        role="menu"
      >
        <a {...itemProps[0]} href="/#" onKeyPress={handleNavigateToStore}>
          Store
        </a>
        <a {...itemProps[1]} href="/#" onKeyPress={handleNavigateToCart}>
          Cart
        </a>
      </div>
    </>
  );
};

export default SkipTo;
