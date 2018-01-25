const request = require("request");
const { ManagementClient } = require('auth0');

const mgmtClient = new ManagementClient({
  domain: 'happyspiritgames.auth0.com',
  clientId: 'KYLPN9wvIe3NkdgAlvWk1DWVw2P5rAxl',
  clientSecret: 'b5nwic7j_o6C8SDWWIO3BoFtQkmM1XV88R_naZCMCcdRw6WUWW6ucy-Q33EBzAPR',
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
