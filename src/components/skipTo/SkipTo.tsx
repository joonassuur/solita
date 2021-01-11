import React from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

import "./SkipTo.scss";

interface PropsInterface {
  skipToContent: () => void;
}

const SkipTo: React.FC<PropsInterface> = ({ skipToContent }) => {
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(1);

  return (
    <>
      <button id="skipto" {...buttonProps}>
        Skip to
      </button>
      <div
        className={`accessible-menu ${isOpen ? "visible" : ""} `}
        role="menu"
      >
        <a
          {...itemProps[0]}
          href="#content"
          onKeyPress={() => {
            setIsOpen(!isOpen);
            skipToContent();
          }}
        >
          Content
        </a>
      </div>
    </>
  );
};

export default SkipTo;
