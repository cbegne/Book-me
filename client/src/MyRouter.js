import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NoMatch from './General/components/NoMatch.js';
import Booking from './Booking/containers/Booking.js';
import InitDb from './General/InitDb.js';

class MyRouter extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/init" component={InitDb} />
          <Route exact path="/booking" component={Booking} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default MyRouter;
