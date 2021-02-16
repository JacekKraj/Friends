import React from "react";
import { Route, Switch } from "react-router-dom";

import AuthenticationMainPage from "./authentication/authenticationMainPage/AuthenticationMainPage";

const App = () => {
  let routes = (
    <Switch>
      <Route path="/" exact render={() => <AuthenticationMainPage />} />
    </Switch>
  );

  return <div>{routes}</div>;
};

export default App;
