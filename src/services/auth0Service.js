const request = require("request");

const getAuth0ApiToken = (callback) => {
  const options = {
    method: 'POST',
    url: 'https://happyspiritgames.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: {
      client_id: 'KYLPN9wvIe3NkdgAlvWk1DWVw2P5rAxl',
      client_secret: 'b5nwic7j_o6C8SDWWIO3BoFtQkmM1XV88R_naZCMCcdRw6WUWW6ucy-Q33EBzAPR',
      audience: 'https://happyspiritgames.auth0.com/api/v2/',
      grant_type: 'client_credentials'
    }
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log('API token', body);
    callback(body);
  });
}

const getUser = (apiToken, subject, callback) => {
  const options = { method: 'GET',
    url: `https://happyspiritgames.auth0.com/api/v2/users/${subject}`,
    headers: {
      authorization: `Bearer ${apiToken}`
    }
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log('user', body);
  });
}

exports.fetchUserInfo = (subject) => {
  getAuth0ApiToken(token => {
    getUser(token, subject, user => {
      console.log('made it', user);
    });
  });
}
