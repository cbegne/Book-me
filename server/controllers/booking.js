import jsonfile from 'jsonfile';
import moment from 'moment';
import * as Control from '../tools/bookingControl.js';
import * as Getter from '../getters/getBooking.js';
import Mongo from '../config/MongoConnection.js';
import * as Setter from '../setters/insertBooking.js';
import * as Tool from '../tools/bookingTool.js';

const bookRoom = async (req, res) => {
  const login = 'cbegne'; // loggedUser, get from cookies or else
  // check again that room is available
  const { day, start, end, room } = req.body;
  const startingTime = await Tool.convertDate(day, start);
  const endingTime = await Tool.convertDate(day, end);
  const booking = {
    name: room,
    author: login,
    start: startingTime,
    end: endingTime,
    createdAt: moment().toISOString(),
  };
  const control = await Setter.insertBooking(booking);
  if (!control) {
    return res.send({
      success: false,
      error: 'An error occured. Please try again or a bit later.', // TBD
    });
  }
  const file = '/static/bookings.json';
  console.log(__dirname);
  try {
    jsonfile.writeFileSync(file, booking, {flag: 'a'})
  } catch (err) {
    console.error('Error: ', err)
  }
  return res.send({
    success: true,
    error: '',
  });
}

const findRoom = async (req, res) => {
  const { day, start, end, people, equipment } = req.body;
  const startingTime = await Tool.convertDate(day, start);
  const endingTime = await Tool.convertDate(day, end);
  const error = await Control.checkDuration(startingTime, endingTime);
  if (error) {
    return res.send({ success: false, error });
  }
  const rooms = await Getter.getMatchingRooms(people, equipment);
  const roomNames = rooms.map(room => room.name);
  const test = await Getter.getAvailableRooms(startingTime, endingTime, roomNames);
  return res.send({
    success: true,
    rooms,
    error: '',
  });
}

export { bookRoom, findRoom };
