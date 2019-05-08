// Imports
const mongoose = require('mongoose');

// Create mongodb schema
const {Schema} = mongoose;

// Define db model
const userModel = new Schema({
  forename: {type: String, required: 'Field must not be blank!'},
  surname: {type: String, required: 'Field must not be blank!'},
  login: {
    username: { type: String, required: 'Field must not be blank', unique: true },
    password: { type: String, required: 'Password can\'t be empty',
                minlength: [6, 'Password must be atleast 6 character long']},
  },
  accountLlevel: { type: Number, required: true, default: 0}
});

module.exports = mongoose.model('users', userModel);
