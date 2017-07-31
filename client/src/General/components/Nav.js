import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/nav.css';

class Nav extends Component {

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">Station F</div>
        <ul className="nav navbar-nav">
          <li className="nav-link">
            <Link to="/booking" className="fa fa-users" />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
