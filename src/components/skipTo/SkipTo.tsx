import React from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

import "./SkipTo.scss";

const SkipTo = () => {
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
        <a {...itemProps[0]} href="/#">
          Store
        </a>
        <a {...itemProps[1]} href="/#cart">
          Cart
        </a>
      </div>
    </>
  );
};

export default SkipTo;
