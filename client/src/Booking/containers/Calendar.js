import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'moment/min/locales';

import 'react-dates/lib/css/_datepicker.css';
import 'rc-time-picker/assets/index.css';

class Calendar extends Component {

  state = {
    date: moment(),
    focused: undefined,
  }

  componentWillMount = () => {
    moment.locale('en-gb');
  }

  handleDay = (date) => {
    this.props.onChange('day', date);
    this.setState({ date });
  }

  handleStartTime = (start) => {
    this.props.onChange('start', start);
  }

  handleEndTime = (end) => {
    this.props.onChange('end', end);
  }

  render() {
    const { date } = this.state;

    return (
      <div className="calendar-container">
      Day
        <SingleDatePicker
          date={date}
          onDateChange={this.handleDay}
          focused={this.state.focused}
          onFocusChange={({ focused }) => this.setState({ focused })}
        />
        Starting at
        <TimePicker
          defaultValue={moment()}
          format="HH:mm"
          showSecond={false}
          disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 22, 23]}
          onChange={this.handleStartTime}
        />
        Ending at
        <TimePicker
          defaultValue={moment()}
          format="HH:mm"
          showSecond={false}
          disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 22, 23]}
          onChange={this.handleEndTime}
        />
      </div>
    );
  }
}

export default Calendar;
