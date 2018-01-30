const playerModel = require('../db/playerModel');

const mapPlayerToAdminApi = player => {
  return {
    id: player.id,
    email: player.email,
    nickname: player.nickname,
    createdAt: player.created_at,
    emailOptInAt: player.agreed_to_comms_at
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

