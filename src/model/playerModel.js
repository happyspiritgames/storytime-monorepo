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