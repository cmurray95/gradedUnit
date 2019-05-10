function userController(User) {

  // Creates new user object and inserts into DB
  function post(req, res) {
    const user = new User(req.body);
    // Submit 400 error if username and password are not submitted
    if(!req.body.login.username || !req.body.login.password){
      res.status(400);
      return res.send("Username and Password are required!")
    }
    //Save new user to DB and return success code
    user.save();
    res.status(201);
    return res.json(user);
  }

  // Used for retrieving DB records
  function get(req, res) {
    const query = {};
    if (req.query.id) {
      query.id = req.query.id;
    }
    User.find(query, (err, users) => {
      if (err) {
        // Respond with error message
        return res.send(err);
      }
      // Respond with json string of users
      return res.json(users);
    })
  }
  return { post, get } ;
}
module.exports = userController;