// Set authorisation strategy to use JSON web token
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User =  require('../models/user.model');
const dbConfig = require('./db');

module.exports = function(passport){
  // Returns passport object for session validation
  let jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = dbConfig.secret;
  passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    User.getUserByID(jwt_payload.data._id, (err, user) => {
      if(err){
        // Error encountered
        return done(err, false);
      };
      if(user) {
        // User found
        return done(null, user);
      }
      // User not found
      return done(null, false);
    })
  }))
}