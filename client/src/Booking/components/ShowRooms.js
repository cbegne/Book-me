import React, { Component } from 'react';

import RoomBox from './RoomBox.js';

class ShowRooms extends Component {

  handleClick = (room) => {
    this.props.onClick(room);
  }

  render() {
    const { rooms, error } = this.props;

    if (error) return <div className="error">{error}</div>;
    if (rooms === undefined) return <div />;
    if (rooms.length === 0) {
      return <div className="not-available">Désolé, il n{"'"}a pas de salles disponibles répondant à vos attentes...</div>;
    }
    const display = rooms.map((room) => {
      const { _id } = room;
      const key = `box_${_id}`;
      return (
        <RoomBox key={key} room={room} onClick={this.handleClick} />
      );
    });
    return (
      <div className="room-container">
        <span>Confirmez la salle que vous souhaitez réserver :</span>
        <div className="room-box-header">
          {display}
        </div>
      </div>
    );
  }
}

export default ShowRooms;
