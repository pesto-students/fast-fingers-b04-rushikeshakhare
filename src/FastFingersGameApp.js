import React from "react";
import RouteConfig from "./RouteConfiguration";
import "./fastFingersGameApp.scss";

function FastFingersGameApp() {
  return (
    <>
      <div className="app-bg" />
      <div className="app-bg-pattern" />
      <div id="toast" />
      <RouteConfig />
    </>
  );
}

export default FastFingersGameApp;
