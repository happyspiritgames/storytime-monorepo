const playerModel = require('../model/playerModel');

exports.getPlayer = (req, res) => {
  // should have been established by middleware
  console.log('user info', req.user);
  console.log('player info', req.player);

  const { playerId } = req.params;
  console.log('getPlayerProfile: playerId=', playerId);

  const profileStub = {
    email: 'bubba@happyspiritgames.com',
    nickname: 'Bubba',
    membersOnlyComms: true,
    profilePicUrl: 'http://localhost:3000/blargy.png'
  };

  res.format({
      'application/json': () => {
        "use strict";
        res.send(profileStub);
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

  // handle errors
  if (req.user === undefined) {
    console.error('Auth is required');
    next(new Error('User must be logged in'));  // TODO make sure this is the right approach
  } else if (req.user.sub === undefined) {
    console.error('Expected sub in json web token to be populated by identity provider');
    next(new Error('User identifier "sub" is missing'));  // TODO make sure this is the right approach
  }

  const playerId = playerModel.findPlayerIdFromIdpSub(req.user.sub);

  // if found, set 'req.player.id' to be used in downstream queries
  if (playerId) {
    // TODO might want to add this to response headers
    req.player = {
      id: playerId
    };
  } else {
    // TODO handle player not found
    console.error('Player record not found for subject:', req.user.sub);
  }

  // if not found, create new player record and mapping record sub => player.id
  next();
}