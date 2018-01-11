// includes
const express = require('express');
const path = require('path');
const routes = require('./src/routes');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// constants
const appClientBuildPath = 'web-client/build';

// configure authentication
passport.use(new FacebookStrategy({
    clientID: '871780702991547',
    clientSecret: '80abbf1fb20c8ad21a9d5633bc59673f',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Now what?');
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    done(null, {userID: 'blargy'});
  }
));

const app = express(),
  port = process.env.PORT || 3001,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, `${appClientBuildPath}`)));

// configure auth routes
// for authentication  TODO place in its own file at some point?
app.route('/auth/facebook').get(passport.authenticate('facebook'));
app.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', { successRedirect: '/account', failureRedirect: '/login' })
);

routes(app);

// do this at the end as a catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+`/${appClientBuildPath}/index.html`));
});

app.listen(port);

console.log('StoryTime API server started on: ' + port);
