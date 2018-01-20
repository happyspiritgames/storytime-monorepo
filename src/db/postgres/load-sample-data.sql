-- TODO use test accounts
BEGIN;
INSERT INTO player
(id, email, nickname)
VALUES ('b8de254b-6a98-468b-bfdb-51c27506e4b0', 'bubba@happyspiritgames.com', 'BubbaBubbaGump');
INSERT INTO identity
(idp_sub, player_id, idp_profile)
VALUES ('google-oauth2|103519193367191062674', 'b8de254b-6a98-468b-bfdb-51c27506e4b0', '{ "given_name": "BubbaBubba", "last_name": "Google" }');
COMMIT;

-- from second identity provider, mapping to existing player
INSERT INTO identity
(idp_sub, player_id, idp_profile)
VALUES ('facebook|10214121106678290', 'b8de254b-6a98-468b-bfdb-51c27506e4b0', '{ "given_name": "BubbaBubba", "last_name": "Facebook" }');

BEGIN;
INSERT INTO player
(id, email, nickname)
VALUES ('10001000-1000-4000-1000-100010001000', 'happy@happyspiritgames.com', 'Happy Spirit');
INSERT INTO identity
(idp_sub, player_id, idp_profile)
VALUES ('google|10001000100010000', '10001000-1000-4000-1000-100010001000', '{ "given_name": "Happy", "last_name": "Spirit" }');
COMMIT;

SELECT * FROM player;
SELECT * FROM identity;

SELECT id, idp_sub, email, nickname, idp_profile
FROM player, identity
WHERE id = player_id;
