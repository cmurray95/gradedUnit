// Imports
const express = require('express'); // Framework for Node.js
const mongoose = require('mongoose'); // For hooking into mongoDB
const bodyParser = require('body-parser'); // Parses HTTP requests/results to be readable
const cors = require('cors') // Middleware for handline Cross-Origin Resource Sharing
const passport = require('passport') // Handles authentication
const path = require('path'); // Shorthand syntax for directories
const dbConfig = require('../config/db'); // Database config file

// Constant declarations
const app = express();

const users = require('../routes/userRouter');

// Instanstiate app object 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// Establish database connection
mongoose.connect(dbConfig.database, {useNewUrlParser: true});
mongoose.connection.on('connected', (err) => {
  if(err){
    console.log('MongoDB connection failed!: ' + err);
  } else {
    console.log('MongoDB connection succesful');
  };
});

// Enable authentication and start session
app.use(passport.initialize());
app.use(passport.session());

// Initialize routes
app.use('/users', users);

// Set unauthorized API redirects
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})
// Define port ***4000***
const port = process.env.PORT || 4000;

// Start API server
app.server = app.listen(port, () => {
  console.log('GradedUnit Server running on port ' + port);
});

module.exports = app;

// Import models
//const User = require('../models/userModel');

// Routes go here. Default path is '../routes/<routeName>
// const userRouter = require('../routes/userRouter')(User);

// Check for test mode enabled
// if(process.env.ENV ===  'Test'){
//   console.log('Test environment');
//   const db = mongoose.connect('mongodb://localhost/usersAPI_Test');
// } else {
//   console.log('Deployment environment');
//   const db = mongoose.connect('mongodb://localhost/usersAPI');
// }
