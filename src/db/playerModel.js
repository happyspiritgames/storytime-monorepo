const db = require('./postgres');
const { generateUUID } = require('../util/generator');

/**
 * Returns all players.
 */
exports.getPlayers = async () => {
  console.log('playerModel.getPlayers');
  const SEL_PLAYERS = 'SELECT * FROM player';
  const dbResult = await db.query(SEL_PLAYERS);
  return dbResult.rows;
};

/**
 * Returns player with given ID.
 * @param {UUID} id - UUID of player to find
 */
exports.getPlayer = async (id) => {
  console.log('playerModel.getPlayer id=', id);
  const SEL_PLAYER = 'SELECT * FROM player WHERE id = $1'
  const result = await db.query(SEL_PLAYER, [id]);
  if (result.rowCount === 1) {
    return result.rows[0];
  }
  console.log('player not found', id)
}

/**
 * Returns player ID that is mapped to given subjectToken, or undefined if not found.
 * @param {string} subjectToken
 */
exports.findPlayerIdFromIdentity = async (subjectToken) => {
  console.log('playerModel.findPlayerIdFromIdentity subject=', subjectToken);
  const SEL_PLAYER_ID_FROM_IDENTITY =
    'SELECT player_id FROM identity WHERE provider = $1 AND provider_user_id = $2';

  const identity = subjectToken.split('|');  // expected format 'provider|##########'
  const result = await db.query(SEL_PLAYER_ID_FROM_IDENTITY, identity);
  if (result.rowCount === 1) {
    return result.rows[0].player_id;
  }
  console.log('player ID not found', subjectToken);
}

/**
 * Transaction to create new player record that is mapped to a social identity.
 * @param {*} subject
 * @param {*} email
 * @param {*} nickname
 * @param {*} socialProfile
 */
exports.createPlayerFromIdentity = async (subjectToken, email, nickname, socialProfile) => {
  console.log('playerModel.createPlayerFromIdentity');
  const INS_PLAYER_QUERY = 'INSERT INTO player (id, email, nickname) VALUES ($1, $2, $3)';
  const INS_IDENTITY_QUERY = 'INSERT INTO identity (provider, provider_user_id, player_id, profile) VALUES ($1, $2, $3, $4)';

  const identity = subjectToken.split('|');  // expected format 'provider|##########'
  const playerId = generateUUID();
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');
    await client.query(INS_PLAYER_QUERY, [playerId, email, nickname]);
    await client.query(INS_IDENTITY_QUERY, [identity[0], identity[1], playerId, socialProfile]);
    await client.query('COMMIT');
  } catch (e) {
    console.error('had to rollback due to error', e);
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
  return playerId;
};

/**
 * Returns an array of role names assigned to player with given ID.
 *
 * @param {*} playerId
 */
exports.getRoles = async (playerId) => {
  console.log('playerModel.getRoles');
  const SEL_ROLES = 'SELECT role.name FROM role, player_role WHERE player_role.player_id = $1 AND player_role.role_id = role.id';
  const dbResult = await db.query(SEL_ROLES, [playerId]);
  return dbResult.rows.map(row => row.name);
}

exports.agreeToBeAuthor = async (playerId) => {
  const UPD_AGREE_TO_AUTHOR_TERMS = 'UPDATE player SET agreed_to_author_at=CURRENT_TIMESTAMP WHERE id=$1';
  const ADD_AUTHOR_ROLE = 'INSERT INTO player_role (player_id, role_id) SELECT $1 as player_id, role.id as role_id FROM role WHERE role.name=$2';
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(UPD_AGREE_TO_AUTHOR_TERMS, [playerId]);
    // will fail if player already has author role
    await client.query(ADD_AUTHOR_ROLE, [player_id, 'author']);
    await client.query('COMMIT');
  } catch (e) {
    console.error('had to rollback due to error', e);
    await client.query('ROLLBACK');
    return false;
  } finally {
    client.release();
  }
  return true;
}

/**
 * Returns possible player statuses.
 */
exports.getPlayerStatusCodes = async () => {
  console.log('playerModel.getPlayerStatusCodes');
  const SEL_ROLES = 'SELECT * FROM player_status';
  const dbResult = await db.query(SEL_ROLES);
  return dbResult.rows;
}

const UPD_PLAYER_COMMS_YES = 'UPDATE player SET agreed_to_comms_at = NOW() WHERE id = $1 and agreed_to_comms_at IS NULL';
const UPD_PLAYER_COMMS_NO = 'UPDATE player SET agreed_to_comms_at = DEFAULT WHERE id = $1 and agreed_to_comms_at IS NOT NULL';

exports.updatePlayer = async (playerId, nickname, membersOnlyCommsOk) => {
  console.log('playerModel.updatePlayer');
  const UPD_PLAYER_QUERY = 'UPDATE player SET nickname = $1 WHERE id = $2';
  let dbResult = await db.query(UPD_PLAYER_QUERY, [nickname, playerId]);

  if (membersOnlyCommsOk) {
    dbResult = await db.query(UPD_PLAYER_COMMS_YES, [playerId]);
  } else {
    dbResult = await db.query(UPD_PLAYER_COMMS_NO, [playerId]);
  }
}

const UPD_PLAYER_STATUS = 'UPDATE player SET status_id = (select id from player_status where name=$2) where id = $1';

exports.activatePlayer = async (playerId) => {
  console.log('playerModel.suspendPlayer');
  const dbResult = await db.query(UPD_PLAYER_STATUS, [playerId, 'active']);
}

exports.suspendPlayer = async (playerId) => {
  console.log('playerModel.suspendPlayer');
  const dbResult = await db.query(UPD_PLAYER_STATUS, [playerId, 'suspended']);
}

exports.deletePlayer = async (playerId) => {
  console.log('playerModel.suspendPlayer');
  const dbResult = await db.query(UPD_PLAYER_STATUS, [playerId, 'deleted']);
}
