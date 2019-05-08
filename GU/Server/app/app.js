// Imports
const express = require('express');

// Constant declarations
const app = express();
const loginRouter = express.Router();

// Define port ***3000***
const port = process.env.PORT || 4000;

loginRouter.route('/users').get((req, res) => {
  const response = { hello: 'This is my api!'};

  res.json(response);
});

app.use('/api', loginRouter);


app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.listen(port, () => {
  console.log('running on port ' + port);
});