import React from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

import "./SkipTo.scss";

interface PropsInterface {
  handleSkip: () => void;
}

const SkipTo: React.FC<PropsInterface> = ({ handleSkip }) => {
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(1);

  return (
    <>
      <button id="skipto" {...buttonProps}>
        Skip to
      </button>
      <div
        className={`accessible-menu ${isOpen ? "visible" : ""} `}
        role="menu"
      >
        <a {...itemProps[0]} href="#content" onKeyPress={handleSkip}>
          Content
        </a>
      </div>
    </>
  );
};

export default SkipTo;
