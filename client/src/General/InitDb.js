import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './components/Loading.js';

class InitDb extends Component {

  state = {
    success: undefined,
  }

  componentDidMount = () => {
    const url = '/api/init_db';
    axios.put(url)
    .then(({ data: { success } }) => {
      this.setState({ success });
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    switch (this.state.success) {
      case true:
        return <Redirect to="/booking" />;
      default:
        return <Loading />;
    }
  }
}

export default InitDb;
