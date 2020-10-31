const express = require('express');
const path = require('path');
const controllers = require('./controllers');
require('./models');

const port = process.env.PORT || 3000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', controllers);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

module.exports = app;