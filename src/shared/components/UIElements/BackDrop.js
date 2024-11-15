import React from "react";
import ReactDOM from "react-dom";

import "./BackDrop.css";

const BackDrop = (props) => {
  const backdropContent = (
    <div className="backdrop" onClick={props.onClick}></div>
  );
  return ReactDOM.createPortal(
    backdropContent,
    document.getElementById("backdrop-hook")
  );
};

export default BackDrop;
