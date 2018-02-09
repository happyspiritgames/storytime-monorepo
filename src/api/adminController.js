const playerModel = require('../db/playerModel');

const mapPlayerToAdminApi = player => {
  return {
    id: player.id,
    email: player.email,
    nickname: player.nickname,
    createdAt: player.created_at,
    emailOptInAt: player.agreed_to_comms_at,
    status: player.status_id,
    authorOptInAt: player.agreed_to_author_at,
    penName: player.pen_name
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
    const transformed = players.map(player => mapPlayerToAdminApi(player));
    res.json(transformed);
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
  const playerId = req.params.playerId;
  console.log('playerController.getPlayer', playerId);
  try {
    const player = await playerModel.getPlayer(playerId);
    const transformed = mapPlayerToAdminApi(player);
    res.json(transformed);
  } catch (e) {
    console.error('Problem with getPlayer', e);
    res.status(500).end();  // TODO standardize error messages
  }
};

exports.suspendPlayer = async (req, res) => {
  const playerId = req.params.playerId;
  console.log('playerController.suspendPlayer', playerId);
  try {
    await playerModel.suspendPlayer(playerId);
    res.status(202).send();
  } catch (e) {
    console.error('Problem with suspendPlayer', e);
    res.status(500).end();  // TODO standardize error messages
  }
}

exports.activatePlayer = async (req, res) => {
  const playerId = req.params.playerId;
  console.log('playerController.activatePlayer', playerId);
  try {
    await playerModel.activatePlayer(playerId);
    res.status(202).send();
  } catch (e) {
    console.error('Problem with activatePlayer', e);
    res.status(500).end();  // TODO standardize error messages
  }
}

exports.deletePlayer = async (req, res) => {
  const playerId = req.params.playerId;
  console.log('playerController.deletePlayer', playerId);
  try {
    await playerModel.deletePlayer(playerId);
    res.status(202).send();
  } catch (e) {
    console.error('Problem with deletePlayer', e);
    res.status(500).end();  // TODO standardize error messages
  }
}