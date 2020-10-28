import React from "react";
import { Route, HashRouter } from "react-router-dom";
import { StartScreen, GameScreen, EndScreen } from "./screens";

const RouteConfiguration = () => {
  return (
    <HashRouter>
      <Route exact={true} path={"/"} component={StartScreen} />
      <Route exact={true} path={"/game"} component={GameScreen} />
      <Route exact={true} path={"/results/:id"} component={EndScreen} />
    </HashRouter>
  );
};

export default RouteConfiguration;
