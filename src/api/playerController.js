const db = require('../db/postgres');
const playerModel = require('../db/playerModel');

/**
 * StoryTime API method for retrieving a list of all players.
 * @param {*} req - the HTTP request
 * @param {*} res - the HTTP response
 */
exports.getPlayers = async (req, res) => {
  console.log('playerController.getPlayers');
  try {
    const players = await playerModel.getPlayers();
    res.json(players);
  } catch (e) {
    console.error('Problem with getPlayers', e);
    res.status(500).end();  // TODO standardize error messages
  }
};

exports.getPlayer = async (req, res) => {
  const { playerId } = req.params;
  console.log('playerController.getPlayer: playerId=', playerId);
  try {
    const player = await playerModel.getPlayer(playerId);
    res.json(player);
  } catch (e) {
    console.error('Problem with getPlayer', e);
    res.status(500).end();  // TODO standardize error messages
  }
};

exports.findPlayer = async (req, res) => {
  const { subject } = req.params;
  console.log('playerController.findPlayer subject=', subject);
  try {
    const playerId = await playerModel.findPlayerIdFromIdentity(subject);
    const player = await playerModel.getPlayer(playerId);
    res.json(player);
  } catch (e) {
    console.error('Problem with findPlayer', e);
    res.status(500).end();  // TODO standardize error messages
  }
}

// exports.createPlayer = async (req, res) => {
//   console.log('createPlayer: player data', req.body);
//   const { subject, email, nickname = 'Rising Star', profile = {} } = req.body;

//   // validate request
//   if (!subject || !email) {
//     res.status(400).send({ message: 'Required values not found: subject, email' });
//   }

//   // pass control to database access
//   let playerId;
//   try {
//     playerId = await playerModel.createPlayerFromIdentity(subject, email, nickname, profile);
//   } catch (e) {
//     console.error(e.stack);
//   }

//   // map database results to response
//   if (playerId) {
//     res.json({ id: playerId });
//   } else {
//     res.status(500).end();
//   }
// };

// exports.getOwnProfile = (req, res) => {

// }

// exports.updateOwnProfile = (req, res) => {

// }

// /**
//  * Uses authentication info to find player ID or create a new player record if not found.
//  *
//  * @param {*} req HTTP request object
//  * @param {*} res HTTP response object
//  * @param {*} next handler to call after this one
//  */
// exports.findOrCreatePlayer = async (req, res, next) => {
//   console.log('findOrCreatePlayer');

//   // handle errors
//   if (req.user === undefined) {
//     console.error('Auth is required');
//     next(new Error('User must be logged in'));  // TODO make sure this is the right approach
//   } else if (req.user.sub === undefined) {
//     console.error('Expected sub in json web token to be populated by identity provider');
//     next(new Error('User identifier "sub" is missing'));  // TODO make sure this is the right approach
//   }

//   console.log(req);
//   const subject = req.user.sub;
//   // const playerId = playerModel.findPlayerId(req.user.sub);
//   const { rows } = await db.query(
//     'SELECT player_id FROM identity WHERE idp_sub = $1', [subject]);
//   console.log('result', rows);
//   const playerId = rows[0].playerId;

//   // if found, set 'req.player.id' to be used in downstream queries
//   if (playerId) {
//     // TODO might want to add this to response headers
//     req.player = {
//       id: playerId
//     };
//   } else {
//     // TODO handle player not found
//     console.error('Player record not found for subject:', req.user.sub);
//   }

//   // if not found, create new player record and mapping record sub => player.id
//   next();
// }