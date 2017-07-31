import React, { Component } from 'react';

import RoomBox from './RoomBox.js';

class ShowRooms extends Component {

  handleClick = (room) => {
    this.props.onClick(room);
  }

  render() {
    const { rooms } = this.props;
    if (rooms === undefined) return <div />;
    switch (rooms.length) {
      case 0:
        return <div>Sorry, no room available with these requests!</div>;
      default: {
        const display = rooms.map((room) => {
          const { _id } = room;
          const key = `box_${_id}`;
          return (
            <RoomBox key={key} room={room} onClick={this.handleClick} />
          );
        });
        return (
          <div className="room-container">
            Click on a room to confirm booking
            <div className="room-box-header">
              {display}
            </div>
          </div>
        );
      }
    }
  }
}

export default ShowRooms;
