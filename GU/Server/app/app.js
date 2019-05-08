// Imports
const express = require('express');
const mongoose = require('mongoose');

// Constant declarations
const app = express();
const db = mongoose.connect('mongodb://localhost/usersAPI');
const loginRouter = express.Router();

// Import models
const user = require('../models/userModel');

// Define port ***4000***
const port = process.env.PORT || 4000;

loginRouter.route('/users').get((req, res) => {
  user.find((err, users) => {
    if(err) {
      return res.send(err);
    }
    return res.json(users);
  });
});

app.use('/api', loginRouter);


app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.listen(port, () => {
  console.log('running on port ' + port);
});