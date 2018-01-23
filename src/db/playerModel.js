const { Pool } = require('pg');
const db = require('./postgres');
const { generateUUID } = require('../util/generator');

const pool = new Pool();

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
exports.findPlayerIdFromIdentity = (subjectToken) => {
  console.log('playerModel.findPlayerIdFromIdentity subject=', subjectToken);
  const SEL_PLAYER_ID_FROM_IDENTITY = 'SELECT player_id FROM identity WHERE idp_sub = $1';
  const result = db.query(SEL_PLAYER_ID_FROM_IDENTITY, [subjectToken]);
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
exports.createPlayerFromIdentity = async (subject, email, nickname, socialProfile) => {
  console.log('createPlayerFromIdentity');
  const INS_PLAYER_QUERY = 'INSERT INTO player (id, email, nickname) VALUES ($1, $2, $3)';
  const INS_IDENTITY_QUERY = 'INSERT INTO identity (idp_sub, player_id, idp_profile) VALUES ($1, $2, $3)';

  const playerId = generateUUID();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query(INS_PLAYER_QUERY, [playerId, email, nickname]);
    await client.query(INS_IDENTITY_QUERY, [subject, playerId, socialProfile]);
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

// exports.findPlayerId = (subject) => {
//   console.log('findPlayerId');
//   const { rows } = await db.query(
//     'SELECT player_id FROM identity WHERE idp_sub = $1', [subject]);
//   console.log('result', rows);
//   return rows[0].playerId;
// }

/* queries

-- create player
BEGIN

INSERT INTO player
(id, idp_sub, email, nickname)
VALUES ($1, $2, $3, $4)
RETURNING id; // ?select on the row?

INSERT INTO identity
(idp_sub, player_id, idp_profile)
VALUE ($1, $2, $3);  // pull $2 from return of first insert

COMMIT

see https://node-postgres.com/features/transactions
use async/await

-- look up player given idp_sub
SELECT player_id
FROM identity
WHERE ipd_sub = "";

-- look up player info
SELECT created_at, email, nickname, agreed_to_comms_at
FROM player
WHERE id = "";

-- update player info
UPDATE player
SET nickname = $2
WHERE id = $1;

-- agree to communications
UPDATE player
SET agreed_to_comms_at = NOW()
WHERE id = $1;

-- revoke agreement to communications
UPDATE player
SET agreed_to_comms_at = DEFAULT
WHERE id = $1;

-- look up stored profile
SELECT idp_profile
FROM identity
WHERE idp_sub = $1

-- update profile
UPDATE identity
SET idp_profile = $2
WHERE idp_sub = $1;

-- delete a player
DELETE FROM identity WHERE player_id = $1;
DELETE FROM player WHERE id = $1;
*/