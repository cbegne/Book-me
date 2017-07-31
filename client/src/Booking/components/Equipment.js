import React, { Component } from 'react';

class Equipment extends Component {

  handleCheckbox = (event) => {
    const name = event.target.name;
    this.props.onChange(name);
  }

  render() {
    return (
      <div className="equipment-container">
        <span>We need:</span>
        <label htmlFor="TV">
          <input
            name="TV"
            type="checkbox"
            onChange={this.handleCheckbox}
          />
          TV
        </label>
        <label htmlFor="Retro Projecteur">
          <input
            name="Retro Projecteur"
            type="checkbox"
            onChange={this.handleCheckbox}
          />
          Retro Projecteur
        </label>
      </div>
    );
  }
}

export default Equipment;
