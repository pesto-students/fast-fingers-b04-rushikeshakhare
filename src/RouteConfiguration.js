import React from "react";
import { Route, HashRouter } from "react-router-dom";
import { StartScreen, GameScreen } from "./screens";

const RouteConfiguration = () => {
  return (
    <HashRouter>
      <Route exact={true} path={"/"} component={StartScreen} />
      <Route exact={true} path={"/game"} component={GameScreen} />
    </HashRouter>
  );
};

export default RouteConfiguration;
