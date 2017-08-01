import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import moment from 'moment';

import config from './config/config.js';
import routes from './routes.js';
import Mongo from './config/MongoConnection.js';

const app = express();
const server = http.createServer(app);

moment().locale('en-gb');
// Connect to Mongo Database
Mongo.connect();

// Activate logging middleware
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load routes
routes(app);

server.listen(8000);
