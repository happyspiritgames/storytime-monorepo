exports.getPlayerProfile = (req, res) => {
  console.log('getPlayerProfile');
  const profile = {
    email: 'bubba@happyspiritgames.com',
    nickname: 'Bubba',
    membersOnlyComms: true,
    profilePicUrl: 'http://localhost:3000/blargy.png'
  };

  res.format({
      'application/json': () => {
        "use strict";
          res.send(profile);
      },
      'default': () => {
        "use strict";
        res.status(406).send('Not Acceptable');
      }
  });
};
