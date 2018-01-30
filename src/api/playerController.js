const playerModel = require('../db/playerModel');
const { fetchUserInfo } = require('../services/auth0Service');

const mapPlayerToProfile = player => {
  return {
    id: player.id,
    email: player.email,
    nickname: player.nickname,
    membersOnlyComms: !!player.agreed_to_comms_at
  };
}

/**
 * StoryTime API method for retrieving a list of all players.
 *
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
 *
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
 *
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

exports.refreshProfile = async (req, res) => {
  console.log('playerController.refreshProfile');
  const { subject } = req.user.sub;
  try {
    const profile = await fetchUserInfo(subject);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).send();
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}

/**
 * Middleware to locate a player record using subject in jwt or to create a new
 * player record if not found.
 *
 * @param {*} req HTTP request object
 * @param {*} res HTTP response object
 * @param {*} next handler to call after this one
 */
exports.findOrCreatePlayer = async (req, res, next) => {
  console.log('playerController.findOrCreatePlayer');

  // make sure client is authenticated
  if (!req.user || !req.user.sub) {
    console.error('Cannot find jwt subject -- should have been extracted from auth header');
    res.status(401).end();
  }

  let playerId;
  const subject = req.user.sub;
  console.log('subject is', subject);
  try {
    // determine player ID
    playerId = await playerModel.findPlayerIdFromIdentity(subject);
    if (!playerId) {
      const profile = await fetchUserInfo(subject);
      const { email, name } = profile;
      playerId = await playerModel.createPlayerFromIdentity(subject, email, name, profile);

      if (!playerId) {
        console.error('Unable to create player account.', subject, email, name);
        res.status(500).send({ message: 'Could not create an player account due to a system error.' });
      }
    }
    req.user.playerId = playerId;

    // determine roles
    const roles = await playerModel.getRoles(playerId);
    req.user.roles = roles;
    next();
  } catch (e) {
    next(e);
  }
}

/**
 * StoryTime API method for retrieving an authenticated player's profile.
 * Expects to find user.playerId in request, which is available if
 * findOrCreatePlayer middleware completes successfully.
 *
 * @param {*} req - the HTTP request
 * @param {*} res - the HTTP response
 */
exports.getSelfProfile = async (req, res) => {
  const { playerId } = req.user;
  console.log('playerController.getPlayer: playerId=', playerId);
  try {
    const player = await playerModel.getPlayer(playerId);
    if (player) {
      res.json(mapPlayerToProfile(player));
    } else {
      res.status(404).send();
    }
  } catch (e) {
    console.error('Problem with getSelfProfile', e);
    res.status(500).end();  // TODO standardize error messages
  }
};

/**
 * Updates a player profile, applying whatever is in the payload to the logged-in
 * user's player record.
 *
 * @param {*} req - the HTTP request
 * @param {*} res - the HTTP response
 */
exports.updateSelfProfile = async (req, res) => {
  const { playerId } = req.user;
  const profileUpdate = req.body;
  console.log('updateSelfProfile playerId=', playerId, 'updates=', profileUpdate);
  try {
    await playerModel.updatePlayer(playerId, profileUpdate.nickname, profileUpdate.membersOnlyComms);
    const profile = await playerModel.getPlayer(playerId);
    res.json(mapPlayerToProfile(profile));
  } catch (e) {
    console.error('Problem with updateSelfProfile', e);
    res.status(500).end();  // TODO standardize error messages
  }
}