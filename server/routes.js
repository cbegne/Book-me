import initDb from './config/initDB.js';

const routes = (app) => {
  app.get('/api/init_db', initDb); // en dev

  // app.post('/api/signup', signup);

};

export default routes;
