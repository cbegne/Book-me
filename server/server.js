import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';
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
// Enable open access across domain-boundaries
app.use(cors());
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());
// Load requests parsers
// extended false to use querystring (true, use qs)
app.use(bodyParser.urlencoded({ extended: false }));


// Load routes
routes(app);

server.listen(8000);
