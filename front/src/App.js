import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import MyAccount  from "./components/details_user";
import Template from "./components/Template/index";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/my-account" component={MyAccount } />
          <Route path="/template-curriculum-vitae" component={Template} />
        </Switch>
      </div>
    );
  }
}

export default App;
