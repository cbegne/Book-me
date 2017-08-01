import initDb from './config/initDB.js';
import * as Booking from './controllers/booking.js';

const routes = (app) => {
  app.put('/api/init_db', initDb); // en dev pour initialiser la base de données (+ tests)

  app.post('/api/find_room', Booking.findRoom);
  app.post('/api/book_room', Booking.bookRoom);

};

export default routes;
