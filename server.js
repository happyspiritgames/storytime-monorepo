// includes
const express = require('express');
const path = require('path');
const apiRoutes = require('./src/api/routes');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

const appClientBuildPath = 'web-client/build';

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
    jwksUri: 'https://happyspiritgames.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://storytime.happyspiritgames.com',
  issuer: 'https://happyspiritgames.auth0.com/',
  algorithms: ['RS256']
});

app.get('/api/authorized', authCheck, (req, res) => {
  res.send('Secured Resource');
});

// configure REST API routes
apiRoutes(app);

// catch-all for everything else
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+`/${appClientBuildPath}/index.html`));
});

app.listen(port);

console.log('StoryTime service started, listening on port: ' + port);
