// Import libs
const jwt = require('jsonwebtoken'); // Allows for server-client handshaking
const passport = require('passport');
const express = require('express');
const User = require('../models/user.model'); // Create User object using defined db model
const config = require('../config/db');
require('../config/passport')(passport);

// Router object for handling CRUD routes
const router = express.Router();

/**
 *  ROUTES - CREATE (signup), AUTHENTICATE (auth),  PROFILE (profile)
 */

 // Create new user
 router.post('/signup', (req, res, next) => {
   let user = new User({
     forename: req.body.forename,
     surname: req.body.surname,
     email: req.body.email,
     username: req.body.username,
     password: req.body.password
   });

   User.createUser(user, (err) => {
     if(err) {
       res.json({success: false, msg:'Error registering account!\n' + err});
     } else {
      res.json({success: true, msg:'Account created!'});
     }
   })
 });

 // Authenticate login
 router.post('/auth', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // Ensure user exists before validating password
  User.getUserByUsername(username, (err, user) => {
    if(err){
      throw err;
    } else if (!user){
      return res.json({success: false, msg: 'User not found.'})
    }
    // Compare submitted password with stored DB hash
    User.validatePassword(password, user.password, (err, match) => {
      if(err){ 
      throw err;
    }
      if(match){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 86400 //  24 hours (seconds)
        });
        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user.__id,
            forename: user.forename, 
            surname: user.surname,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Password invalid!'});
      }
    }
  )})
});

 // User profile
 router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({user: req.user});
});


// // Import libs
// const express = require('express');
// const userController = require('../controllers/userController');

// // Controls all routes for GET, POST, PUT, DELETE and PATCH
// function routes(User) {

//   // Create user router object using imported express module
//   const userRouter = express.Router();

//   // Initialize controller 
//   const controller = userController(User);
  
//   // Defines user routes and access methods
//   userRouter.route('/users')
//     // Submit new user
//     .post(controller.post)
//     // Retrieve all users
//     .get(controller.get);
  
//   //Middleware - intercepts and edits request before passing on to server
//   userRouter.use('/users/:userId', (req, res, next) => {
//     User.findById(req.params.userId, (err, user) => {
//       if (err) {
//         // Respond with error message
//         return res.send(err);
//       }
//       if(user){
//         // Modify user object before passing on
//         req.user = user;
//         return next();
//       }
//       // Return with 404 - Record not found
//       return res.sendStatus(404);
//     });
//   });
//   //Return single user
//   userRouter.route('/users/:userId')
//   .get((req, res) => res.json(req.user))
//   // Update
//   .put((req, res) => {
//     const {user} = req;
//       user.username = req.body.username;
//       user.password = req.body.password;
//       user.forename = req.body.forename;
//       user.surname = req.body.surname;
//       req.user.save((err) => {
//         if(err) {
//           return res.send(err);
//         }
//         return res.json(user);
//       })
//       // Respond with requested user
//       return res.json(user);
//     })
//   .patch((req, res) => {
//     const {User} = req;

//     // Prevents manual setting of user ID
//     if(req.body._id) {
//       delete req.body._id;
//     }

//     // Retrieve array of key-value pairs from requested object
//     // then edit each entry if it exists
//     Object.entries(req.body).forEach(item => {
//       const key = item[0];
//       const value = item[1];
//       book[key] = value;
//     });

//     req.user.save((err) => {
//       if(err) {
//         return res.send(err);
//       }
//       return res.json(user);
//     })
//   })
//   .delete((req, res) => {
//     req.user.remove((err) => {
//       if(err){
//         return res.send(err);
//       }
//       // Return success code - 204
//       return res.sendStatus(204);
//     })
//   })
//   return userRouter;
// }

module.exports = router;