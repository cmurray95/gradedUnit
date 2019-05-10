// Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import models
const User = require('../models/userModel');

// Routes go here. Default path is '../routes/<routeName>
const userRouter = require('../routes/userRouter')(User);

// Constant declarations
const app = express();

// Check for test mode enabled
if(process.env.ENV ===  'Test'){
  console.log('Test environment');
  const db = mongoose.connect('mongodb://localhost/usersAPI_Test');
} else {
  console.log('Deployment environment');
  const db = mongoose.connect('mongodb://localhost/usersAPI');
}

// Define port ***4000***
const port = process.env.PORT || 4000;

// Instanstiate app object 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', userRouter);

// Start API server
app.server = app.listen(port, () => {
  console.log('running on port ' + port);
});

module.exports = app;