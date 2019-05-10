// Import test libraries
const should = require('should'); 
const sinon = require('sinon');
const userController = require('../controllers/userController');

describe('User, Controller Tests:', () => {
  describe('Post', () => {
    it('should not be allowed to submit empty username/password', () => {
      const User = function (user) { this.save = () => {}};

      // Generate a mock request and response for sending onto test function
      const req = {
        body: {
          login: {
            username: "test"
          },
          forename: 'Testy',
          surname: 'McTesterson'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = userController(User);
      controller.post(req, res);

      // Test should return 400 - req is missing username and password
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0]}`);
      res.send.calledWith('Username and Password are required!').should.equal(true);
    })
  })
})