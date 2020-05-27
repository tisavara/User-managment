import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./project/login";
import UserManage from "./project/userManage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/user" component={UserManage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
