import axios from 'axios';
import React, { Component } from 'react';
import moment from 'moment';

import Calendar from './Calendar.js';
import Capacity from '../components/Capacity.js';
import ShowRooms from '../components/ShowRooms.js';
import Equipment from '../components/Equipment.js';
import SubmitForm from '../components/SubmitForm.js';

import '../css/booking.css';

class Booking extends Component {

  state = {
    day: moment(),
    start: moment(),
    end: moment().add(1, 'hours'),
    people: 1,
    equipment: [],
    error: '',
    rooms: undefined,
  }

  saveBooking = (room) => {
    const { day, start, end } = this.state;
    const book = Object.assign({},
      { day },
      { start },
      { end },
      { room },
    );
    const url = '/api/book_room';
    axios.post(url, book)
    .then(({ data }) => {
      const { success, error } = data;
      if (success === false) {
        this.setState({ error });
      } else {
        console.log(success);
        // this.setState({ rooms });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  saveState = (field, value) => {
    this.setState({ [field]: value });
  }

  saveDate = (field, value) => {
    this.setState({ [field]: value });
  }

  addEquipment = (value) => {
    const { equipment } = this.state;
    // const index = equipment.indexOf(value);
    const index = equipment.findIndex(i => i.name === value);
    if (index === -1) {
      equipment.push({ name: value });
    } else {
      equipment.splice(index, 1);
    }
    this.setState({ equipment });
  }

  findRooms = (event) => {
    event.preventDefault();
    const { day, start, end, people, equipment } = this.state;
    const peopleNumber = parseInt(people, 10);
    const search = Object.assign({},
      { day },
      { start },
      { end },
      { people: peopleNumber },
      { equipment },
    );
    const url = '/api/find_room';
    axios.post(url, search)
    .then(({ data }) => {
      const { success, error } = data;
      if (success === false) {
        this.setState({ error });
      } else {
        const { rooms } = data;
        this.setState({ rooms });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { day, start, end, rooms } = this.state;

    return (
      <div className="booking-container">
        <h1>Book a room</h1>
        <div>
          The room I need:
          <form className="" onSubmit={this.findRooms}>
            <Calendar day={day} start={start} end={end} onChange={this.saveDate} />
            Filter more:
            <Capacity onChange={this.saveState} />
            <Equipment onChange={this.addEquipment} />
            <SubmitForm className="btn btn-default" value="See availability" />
          </form>
          <ShowRooms rooms={rooms} onClick={this.saveBooking} />
        </div>
      </div>
    );
  }
}

export default Booking;
