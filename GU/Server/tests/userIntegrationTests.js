// Import testing Libraries
require('should');
const request = require('supertest');
const mongoose = require('mongoose');

// Run in testing DB
process.env.ENV = 'Test';

const app = require('../app/app.js');
const User = require('../models/userModel');
const agent = request.agent(app);

/**
 * Creates User object and tests all API endpoints (CRUD operations)
 */
describe('User CRUD Testing', () => {
  it('Should allow a User to be posted and return username and _id', (done) => {
    
    const userPost = {
      login: {
        username: "IntegrationTester1",
        password: "password"
      },
      forename: "Integration",
      surname: "Tester"
    };

    agent.post('/api/users')
    .send(userPost)
    .expect(200)
    .end((err, results) => {
      console.log(results);
      results.body.login.username.should.not.equal('false');
      results.body.should.have.property('_id');
      done();
    });
  });

  afterEach((done) => {
    //Clean up DB after tests
    User.deleteMany({}).exec();
    done();
  })

  // Close connection
  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  })
})