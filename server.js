const express = require('express');
const path = require('path');
const routes = require('./src/routes');
const appClientBuildPath = 'web-client/build';

const app = express(),
  port = process.env.PORT || 3001,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, `${appClientBuildPath}`)));

routes(app);

// do this at the end as a catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+`/${appClientBuildPath}/index.html`));
});

app.listen(port);

console.log('StoryTime API server started on: ' + port);
