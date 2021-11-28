import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import App from "./App";
import Counter from "./Components/counter";

const Routes = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={Counter} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
