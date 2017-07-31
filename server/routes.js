import initDb from './config/initDB.js';
import * as Booking from './controllers/booking.js';

const routes = (app) => {
  app.get('/api/init_db', initDb); // en dev

  app.post('/api/find_room', Booking.findRoom);
  app.post('/api/book_room', Booking.bookRoom);

};

export default routes;
