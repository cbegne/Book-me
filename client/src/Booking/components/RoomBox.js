import React, { Component } from 'react';

class RoomBox extends Component {

  handleClick = (event) => {
    event.preventDefault();
    const room = event.target.name;
    this.props.onClick(room);
  }

  render() {
    const { key, name, description, capacity, equipements } = this.props.room;
    const equipment = equipements.map(i => `${i.name} `);
    const tab = [
      { name: 'Nom', value: name },
      { name: 'Description', value: description },
      { name: 'Capacité', value: capacity },
      { name: 'Equipements', value: equipment },
    ];
    const show = tab.map(data => (
      <div key={data.name}>
        <span className="infos-oneroom"><b>{data.name}</b></span>
        <span>{data.value}</span>
      </div>
    ));

    return (
      <div key={key}>
        <div className="room-box">
          {show}
        </div>
        <button className="btn btn-default" name={name} onClick={this.handleClick}>
          Réservez moi!
        </button>
      </div>
    );
  }
}

export default RoomBox;
