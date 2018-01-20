
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

-- create player example
INSERT INTO player
(id, idp_sub, email, nickname)
VALUES ('b8de254b-6a98-468b-bfdb-51c27506e4b0', 'google|10214121106678290',
  'bubba@happyspiritgames.com', 'BubbaBubbaGump');

INSERT INTO identity
(idp_sub, player_id, idp_profile)
VALUE ('google|10214121106678290', 'b8de254b-6a98-468b-bfdb-51c27506e4b0',
  '{}');

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
