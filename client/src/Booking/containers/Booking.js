import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';

import Calendar from './Calendar.js';
import Capacity from '../components/Capacity.js';
import Equipment from '../components/Equipment.js';
import ShowRooms from '../components/ShowRooms.js';
import ShowBooking from '../components/ShowBooking.js';
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
    booked: false,
    bookingInfos: {},
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
        const { startingTime, endingTime } = data;
        const bookingInfos = { room, startingTime, endingTime };
        this.setState({ rooms: undefined, booked: true, bookingInfos });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  saveState = (field, value) => {
    this.setState({ [field]: value, rooms: undefined });
  }

  saveDate = (field, value) => {
    this.setState({ [field]: value, rooms: undefined });
  }

  addEquipment = (value) => {
    const { equipment } = this.state;
    const index = equipment.findIndex(i => i.name === value);
    if (index === -1) {
      equipment.push({ name: value });
    } else {
      equipment.splice(index, 1);
    }
    this.setState({ equipment, rooms: undefined });
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
        this.setState({ error: '', bookingInfos: {}, rooms });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { day, start, end, rooms, error, bookingInfos } = this.state;

    return (
      <div className="booking-container">
        <h1 className="booking-title">Réserver une salle</h1>
        <form className="booking-form" onSubmit={this.findRooms}>
          <span className="collage" />
          <Calendar day={day} start={start} end={end} onChange={this.saveDate} />
          <Capacity onChange={this.saveState} />
          <Equipment onChange={this.addEquipment} />
          <SubmitForm className="btn btn-secondary" value="Find a room" />
        </form>
        <ShowRooms error={error} rooms={rooms} onClick={this.saveBooking} />
        <ShowBooking booking={bookingInfos} />
      </div>
    );
  }
}

export default Booking;
