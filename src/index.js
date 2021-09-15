const express = require('express');
require('express-async-errors');
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  console.log('### ERROR HANDLER');
  console.log(error);
  response.sendStatus(500);
});

app.listen(process.env.PORT || 3000, () => console.log('Server start in http://localhost:3000/'));
