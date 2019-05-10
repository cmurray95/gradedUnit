const express = require('express');
const {MongoClient} = require('mongodb');

const authRouter = express.Router();

function router() {
  authRouter.route('/sigUp').post((req, res) => {
    
  })
}