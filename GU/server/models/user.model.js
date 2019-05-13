// Imports
const bcrypt = require('bcrypt'); // For password hashing
const mongoose = require('mongoose');
const config =  require('../config/db');

// Create mongodb schema
const {Schema} = mongoose;

// Define db model
const userModel = new Schema({
  name: {type: String, required: 'Field must not be blank!'},
  email: {type: String, required: 'Field must not be blank', unique: true},
  username: { type: String, required: 'Field must not be blank', unique: true },
  password: { type: String, required: 'Password can\'t be empty'},
  accountLlevel: { type: Number, required: true, default: 0}
});

const User = module.exports = mongoose.model('users', userModel);

/**
 * USER FUNCTIONS - GET USER, CREATE USER
 */

// Retrieve user...
// ...by ID
module.exports.getUserByID = function(id, callback){
  User.findById(id, callback);
}

// ...by username
module.exports.getUserByUsername = function(username, callback){
  // Search db for user
  const query = {username: username};
  User.findOne(query, callback);
}

// Create new user
module.exports.createUser = function(user, callback){
  //Hash password and assign to user 
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) throw err;
      user.password = hash;
      user.save(callback);
    });
});
}

// Validate user password
module.exports.validatePassword = function(password, hash, callback){
  bcrypt.compare(password, hash, (err, match) => {
    if(err) throw err;
    callback(null, match);
  });
}
 