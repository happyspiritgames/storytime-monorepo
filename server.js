// includes
const express = require('express');
const path = require('path');
const apiRoutes = require('./src/api/routes');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const appClientBuildPath = 'client/build';

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// static routes served from here
app.use(express.static(path.join(__dirname, `${appClientBuildPath}`)));

// configure auth
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

app.get('/api/authorized', authCheck, (req, res) => {
  res.send('Secured Resource');
});

// configure REST API routes
apiRoutes(app, authCheck);

// catch-all for everything else
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+`/${appClientBuildPath}/index.html`));
});

app.listen(port);

console.log('StoryTime service started, listening on port: ' + port);
