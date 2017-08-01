import React, { Component } from 'react';

class Equipment extends Component {

  handleCheckbox = (event) => {
    const name = event.target.name;
    this.props.onChange(name);
  }

  render() {
    return (
      <div className="equipment-container">
        <span>Il me faut : </span>
        <label htmlFor="TV">
          <input
            name="TV"
            type="checkbox"
            onChange={this.handleCheckbox}
          />
          <span className="equipment-label-checkbox">TV</span>
        </label>
        <label htmlFor="Retro Projecteur">
          <input
            name="Retro Projecteur"
            type="checkbox"
            onChange={this.handleCheckbox}
          />
          <span className="equipment-label-checkbox">Retro Projecteur</span>
        </label>
      </div>
    );
  }
}

export default Equipment;
