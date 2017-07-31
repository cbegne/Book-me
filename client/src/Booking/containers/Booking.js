import axios from 'axios';
import React, { Component } from 'react';
import moment from 'moment';

import Calendar from './Calendar.js';
import Capacity from '../components/Capacity.js';
import Equipment from '../components/Equipment.js';
import SubmitForm from '../components/SubmitForm.js';

import '../css/booking.css';

class Booking extends Component {

  state = {
    day: moment,
    start: undefined,
    end: undefined,
    people: 0,
    equipment: [],
  }

  saveState = (field, value) => {
    this.setState({ [field]: value });
  }

  saveDate = (field, value) => {
    const test = moment(value).toISOString();
    console.log(test);
    this.setState({ [field]: test });
  }

  addEquipment = (value) => {
    const { equipment } = this.state;
    const index = equipment.indexOf(value);
    if (index === -1) {
      equipment.push(value);
    } else {
      equipment.splice(index, 1);
    }
    this.setState({ equipment });
    console.log(equipment);
  }

  findRooms = () => {
    const login = 'cbegne'; // loggedUser, get from cookies or else
    const search = Object.assign({}, this.state, login);
    const url = '/api/find_room';
    axios.post(url, search)
    .then(({ data }) => {
      const { success, message } = data;
      console.log(message);
      if (success === false) {
        this.setState({ success: false });
      }
      if (success === true) {
        this.setState({ success: true });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    return (
      <div className="booking-container">
        <h1>Book a room</h1>
        <div>
          The room I need:
          <form className="" onSubmit={this.findRooms}>
            <Calendar onChange={this.saveDate} />
            Filter more:
            <Capacity onChange={this.saveState} />
            <Equipment onChange={this.addEquipment} />
            <SubmitForm className="btn btn-default" value="See availability" />
          </form>
        </div>
      </div>
    );
  }
}

export default Booking;

// <ShowRooms />
