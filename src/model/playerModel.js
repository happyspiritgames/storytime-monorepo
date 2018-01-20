const db = require('../db/postgres');

// TODO finish for admin screen
// exports.getAllPlayers = () => {
//   console.log('playerModel.getAllPlayers');
//   db.query(
//     'SELECT * FROM player'
//   )
// }

exports.getPlayer = (id) => {
  console.log('playerModel.getPlayer');
  db.query(
    'SELECT id, created_at, email, nickname, agreed_to_comms_at FROM player WHERE id = $1',
    [id],
    (err, res) => {
      if (err) {
        console.error(err);
        throw err;  // TODO use a callback?
      }
      return res.rows[0];  // TODO use a callback?
    });
}

exports.addPlayer = (idp_sub, email, nickname, profile) => {
  db.getClient((err, client, done) => {
    // requires transaction to insert into player and identity
    // TODO finish
    client.query('BEGIN');
    client.query('COMMIT');
    done();
  });
}

exports.findPlayerIdFromIdpSub = (ipd_sub) => {
  console.log('findPlayerIdFromIdpSub');
}

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