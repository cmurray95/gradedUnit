// Import libs
const express = require('express');
const userController = require('../controllers/userController');

// Controls all routes for GET, POST, PUT, DELETE and PATCH
function routes(User) {

  // Create user router object using imported express module
  const userRouter = express.Router();

  // Initialize controller 
  const controller = userController(User);
  
  // Defines user routes and access methods
  userRouter.route('/users')
    // Submit new user
    .post(controller.post)
    // Retrieve all users
    .get(controller.get);
  
  //Middleware - intercepts and edits request before passing on to server
  userRouter.use('/users/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        // Respond with error message
        return res.send(err);
      }
      if(user){
        // Modify user object before passing on
        req.user = user;
        return next();
      }
      // Return with 404 - Record not found
      return res.sendStatus(404);
    });
  });
  //Return single user
  userRouter.route('/users/:userId')
  .get((req, res) => res.json(req.user))
  // Update
  .put((req, res) => {
    const {user} = req;
      user.login.username = req.body.login.username;
      user.login.password = req.body.login.password;
      user.forename = req.body.forename;
      user.surname = req.body.surname;
      req.user.save((err) => {
        if(err) {
          return res.send(err);
        }
        return res.json(user);
      })
      // Respond with requested user
      return res.json(user);
    })
  .patch((req, res) => {
    const {User} = req;

    // Prevents manual setting of user ID
    if(req.body._id) {
      delete req.body._id;
    }

    // Retrieve array of key-value pairs from requested object
    // then edit each entry if it exists
    Object.entries(req.body).forEach(item => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });

    req.user.save((err) => {
      if(err) {
        return res.send(err);
      }
      return res.json(user);
    })
  })
  .delete((req, res) => {
    req.user.remove((err) => {
      if(err){
        return res.send(err);
      }
      // Return success code - 204
      return res.sendStatus(204);
    })
  })
  return userRouter;
}

module.exports = routes;