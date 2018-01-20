const playerModel = require('../model/playerModel');
const db = require('../db/postgres');

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

/**
 * Uses authentication info to find player ID or create a new player record if not found.
 *
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 * @param {*} next handler to call after this one
 */
exports.findOrCreatePlayer = async (req, res, next) => {
  console.log('findOrCreatePlayer');

  // handle errors
  if (req.user === undefined) {
    console.error('Auth is required');
    next(new Error('User must be logged in'));  // TODO make sure this is the right approach
  } else if (req.user.sub === undefined) {
    console.error('Expected sub in json web token to be populated by identity provider');
    next(new Error('User identifier "sub" is missing'));  // TODO make sure this is the right approach
  }

  const subject = req.user.sub;
  // const playerId = playerModel.findPlayerId(req.user.sub);
  const { rows } = await db.query(
    'SELECT player_id FROM identity WHERE idp_sub = $1', [subject]);
  console.log('result', rows);
  const playerId = rows[0].playerId;

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