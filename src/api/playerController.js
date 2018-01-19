exports.getPlayerProfile = (req, res) => {
  console.log('getPlayerProfile');
  console.log('user info', req.user);
  console.log('player info', req.player);
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

exports.findOrCreatePlayer = (req, res, next) => {
  // TODO get this working
  // TODO use sessions to speed look-ups; only keep IDs in session, mapped by access token or something
  //      only go to database when no session

  console.log('findOrCreatePlayer');

  // use req.user.sub to look up player in database
  req.player = {
    id: 'bubba123'
  };

  // if found, set 'req.player.id' to be used in downstream queries

  // if not found, create new player record and mapping record sub => player.id
  next();
}