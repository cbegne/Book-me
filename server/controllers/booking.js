import jsonfile from 'jsonfile';
import moment from 'moment';
import * as Control from '../tools/bookingControl.js';
import * as Getter from '../getters/getBooking.js';
import Mongo from '../config/MongoConnection.js';
import * as Setter from '../setters/insertBooking.js';
import * as Tool from '../tools/bookingTool.js';

const bookRoom = async (req, res) => {
  const login = 'cbegne'; // loggedUser, get from cookies or else
  const { day, start, end, room } = req.body;
  const startingTime = await Tool.convertDate(day, start);
  const endingTime = await Tool.convertDate(day, end);
  const roomNotAvailable = await Getter.getAvailableRooms(startingTime, endingTime, [ room ]);
  if (roomNotAvailable.length) {
    return res.send({
      success: false,
      error: 'Oups... La salle a été réservée. Vous pouvez relancer la recheche pour trouver une autre salle.',
    });
  }
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
      error: 'Nous avons rencontré un problème. Veuillez réessayer plus tard.', // TBD
    });
  }
  const file = `${__dirname}/../tmp/bookings.json`;
  try {
    jsonfile.writeFileSync(file, booking, {flag: 'a'})
  } catch (err) {
    console.error('Error: ', err)
  }
  return res.send({
    startingTime,
    endingTime,
    success: true,
    error: '',
  });
}

const findRoom = async (req, res) => {
  const { day, start, end, people, equipment } = req.body;
  if (!day) {
    return res.send({ success: false, error: "Vous n'avez pas sélectionné de date." });
  }
  const startingTime = await Tool.convertDate(day, start);
  const endingTime = await Tool.convertDate(day, end);
  const error = await Control.checkDuration(startingTime, endingTime);
  if (error) {
    return res.send({ success: false, error });
  }
  const rooms = await Getter.getMatchingRooms(people, equipment);
  const roomNames = rooms.map(room => room.name);
  const roomsNotAvailable = await Getter.getAvailableRooms(startingTime, endingTime, roomNames);
  const roomsNamesNotAvailable = roomsNotAvailable.map(room => room.name);
  let roomsAvailable = [];
  rooms.forEach((room) => {
    if (roomsNamesNotAvailable.includes(room.name) === false) {
      roomsAvailable.push(room);
    }
  })
  return res.send({
    success: true,
    rooms: roomsAvailable,
    error: '',
  });
}

export { bookRoom, findRoom };
