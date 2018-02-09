const playerModel = require('../db/playerModel');
const { internalError, errorMessage } = require('./errors');

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
    res.status(500).send(internalError);
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
    if (!player) {
      res.status(404).send(errorMessage('Player was not found'));
    }
    res.json(player);
  } catch (e) {
    console.error('Problem with getPlayer', e);
    res.status(500).send(internalError);
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
    res.status(500).send(internalError);
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
    res.status(500).send(internalError);
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
    res.status(500).send(internalError);
  }
}