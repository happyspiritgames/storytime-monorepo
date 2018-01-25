const request = require("request");
const { ManagementClient } = require('auth0');
require('dotenv').config();

const mgmtClient = new ManagementClient({
  domain: 'happyspiritgames.auth0.com',
  clientId: process.env.MGMT_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scope: 'read:users',
  audience: 'https://happyspiritgames.auth0.com/api/v2/'
});

exports.fetchUserInfo = async (subject) => {
  console.log('auth0Service.fetchUserInfo');
  const profiles = await mgmtClient.getUser(subject);

  return (Array.isArray(profiles))
    ? profiles.find(profile => (profile.user_id === subject))
    : profiles;
}
