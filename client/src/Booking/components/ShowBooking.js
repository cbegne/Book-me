import moment from 'moment';
import React, { Component } from 'react';
import 'moment/min/locales';

class ShowBooking extends Component {

  render() {
    const { booking } = this.props;
    const { room, startingTime, endingTime } = booking;
    const date = moment(startingTime).locale('fr-fr').format('dddd Do MMMM YYYY');
    const start = moment(startingTime).format('H:mm');
    const end = moment(endingTime).format('H:mm');

    if (Object.keys(booking).length === 0) return <div />;
    return (
      <div className="booking-confirm">
        <span className="glyphicon glyphicon-ok" />
        C{"'"}est confirmé !<br /><br />
        Vous avez réservé la {room} le {date}, de {start} à {end}.
      </div>
    );
  }
}

export default ShowBooking;
