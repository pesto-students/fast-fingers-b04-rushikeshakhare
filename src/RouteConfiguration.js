import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { StartScreen } from "./screens";

const RouteConfiguration = () => {
  return (
    <BrowserRouter>
      <Route exact={true} path={"/"} component={StartScreen} />
    </BrowserRouter>
  );
};

export default RouteConfiguration;
