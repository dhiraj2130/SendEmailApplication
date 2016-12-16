/**
 * Created by dhiraj.kumar on 16/12/2016.
 */
const app = require('express')();
const bodyParser = require('body-parser');
const errors = require('./middleware/errors');
const logging = require('./middleware/logging');
const routes = require('./routes');

// add errors and logging as middleware if time permits. Ideally it should be done

// app.use(logging); if time permits
app.use(bodyParser.json());
app.use(routes);

module.exports = app;