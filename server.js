var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/storytimeRoutes'); //importing route
routes(app); //register the routes

app.listen(port);

console.log('StoryTime RESTful API server started on: ' + port);
