const db = require('../db/postgres');
const playerModel = require('../db/playerModel');
const { generateRandomString } = require('../util/generator');

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

/**
 * StoryTime API method for retrieving a player.
 * @param {*} req - the HTTP request
 * @param {*} res - the HTTP response
 */
exports.getPlayer = async (req, res) => {
  const { playerId } = req.params;
  console.log('playerController.getPlayer: playerId=', playerId);
  try {
    const player = await playerModel.getPlayer(playerId);
    if (player) {
      res.json(player);
    } else {
      res.status(404).send();
    }
  } catch (e) {
    console.error('Problem with getPlayer', e);
    res.status(500).end();  // TODO standardize error messages
  }
};

/**
 * StoryTime API method for finding a player given a subject token.
 * @param {*} req - the HTTP request
 * @param {*} res - the HTTP response
 */
exports.findPlayer = async (req, res) => {
  const { subject } = req.params;
  console.log('playerController.findPlayer subject=', subject);
  try {
    const playerId = await playerModel.findPlayerIdFromIdentity(subject);
    if (playerId) {
      const player = await playerModel.getPlayer(playerId);
      res.json(player);
    } else {
      res.status(404).send();
    }
  } catch (e) {
    console.error('Problem with findPlayer', e);
    res.status(500).end();  // TODO standardize error messages
  }
}

/**
 * Middleware to
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 * @param {*} next handler to call after this one
 */
exports.findOrCreatePlayer = async (req, res, next) => {
  console.log('playerController.findOrCreatePlayer');

  // make sure client is authenticated
  // expect that 'user' has been added to request and is jwt with 'sub' (subject) set
  if (req.user === undefined) {
    console.error('Auth is required');
    next(new Error('User must be logged in'));  // TODO make sure this is the right approach
  } else if (req.user.sub === undefined) {
    console.error('Expected sub in json web token to be populated by identity provider');
    next(new Error('User identifier "sub" is missing'));  // TODO make sure this is the right approach
  }

  let playerId;
  const subject = req.user.sub;
  try {
    playerId = await playerModel.findPlayerIdFromIdentity(subject);
    if (!playerId) {
      // TODO get user from auth0
      const nickname = generateRandomString();
      const email = `${nickname}@hsg.com`;
      const profile = {picture: `${nickname}.png`};

      playerId = await playerModel.createPlayerFromIdentity(subject, email, nickname, profile);
      if (!playerId) {
        // throw a fit
        next(new Error('Had trouble creating player'));
      }
    }
    // TODO figure out where to put this -- why not on user?
    req.user.playerId = playerId;
    next();
  } catch (e) {
    next(e);
  }
}