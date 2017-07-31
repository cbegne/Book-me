import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import FinalSignUp from './General/containers/FinalSignUp.js';
import Forgot from './General/containers/Forgot.js';
import NewPassword from './General/containers/NewPassword.js';
import HomePage from './HomePage/containers/HomePage.js';
import App from './App.js';
import PrivateRoute from './PrivateRoute.js';
import NoMatchConnected from './General/components/NoMatchConnected.js';


import InitDb from './General/InitDb.js';

class MyRouter extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/oubli" component={Forgot} />
          <Route exact path="/change/:token" component={NewPassword} />
          <Route exact path="/auth/:token" component={FinalSignUp} />
          <Route exact path="/init" component={InitDb} />
          <PrivateRoute path="*" component={App} />
          <Route path="*" component={NoMatchConnected} />
        </Switch>
      </Router>
    );
  }
}

export default MyRouter;
