INSERT INTO player
(id, email, nickname)
VALUES ('b8de254b-6a98-468b-bfdb-51c27506e4b0', 'bubba@happyspiritgames.com', 'BubbaBubbaGump');

INSERT INTO identity
(idp_sub, player_id, idp_profile)
VALUES ('google|10214121106678290', 'b8de254b-6a98-468b-bfdb-51c27506e4b0', '{ "given_name": "Bubba", "last_name": "Gump" }');

SELECT * FROM player;
SELECT * FROM identity;

SELECT id, idp_sub, email, nickname, idp_profile
FROM player, identity
WHERE id = player_id;
