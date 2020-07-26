import React from "react";
import "../stylesheets/Loader.css";

export default function Loader({ size }) {
  return (
    <div className="loader_wrapper">
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
