const express = require('express');
const routes = require('./src/routes');

const app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port);

console.log('StoryTime RESTful API server started on: ' + port);
