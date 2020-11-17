const express = require('express');
const path = require('path');
const http = require('http');
const compression = require('compression');
const helmet = require('helmet');
const controllers = require('./controllers');
const { socketConnection : { io } } = require('./helpers/socket');
const { errorHandler } = require('./helpers/exceptions');
require('./db/mongodb');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', controllers);
app.use(errorHandler);
app.use(compression());
app.use(helmet());

io.attach(server, { pingTimeout: 60000 }); // pingTimeout: 6000 - to fix websockets connection closed error

server.listen(port);

module.exports = app;
