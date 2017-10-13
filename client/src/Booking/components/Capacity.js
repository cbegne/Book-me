import React, { Component } from 'react';

class Capacity extends Component {

  handleSelect = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.props.onChange(name, value);
  }

  render() {
    const list = [];
    let i = 1;
    for (i = 1; i < 27; i += 1) {
      const key = `people_${i}`;
      list.push(<option value={i} key={key}>{i}</option>);
    }

    return (
      <div className="capacity-container">
        <span className="glyphicon glyphicon-asterisk" />
        <span>Nous sommes </span>
        <select name="people" onChange={this.handleSelect}>
          {list}
        </select>
        <span> personnes.</span>
      </div>
    );
  }
}

export default Capacity;
