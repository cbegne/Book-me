import * as Getter from '../getters/getBooking.js';
import moment from 'moment';

const convertDate = (day, time) => {
  const year = moment(day).get('year');
  const month = moment(day).get('month');
  const date = moment(day).get('date');
  const hour = moment(time).get('hour');
  const minute = moment(time).get('minute');
  const ISOTime = moment().set({
    'year': year,
    'month': month,
    'date': date,
    'hour': hour,
    'minute': minute
  }).toISOString();
  return ISOTime;
}

export { convertDate };
