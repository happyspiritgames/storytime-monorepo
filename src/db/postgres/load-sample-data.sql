-- TODO use test accounts
BEGIN;
INSERT INTO player
(id, email, nickname)
VALUES ('10001000-1000-4000-1000-100010001000', 'happy@happyspiritgames.com', 'Happy Spirit');
INSERT INTO identity
(provider, provider_user_id, player_id, profile)
VALUES ('google-oauth2', '100010001000100010000', '10001000-1000-4000-1000-100010001000', '{ "given_name": "Happy", "last_name": "Google" }');
COMMIT;

-- from second identity provider, mapping to existing player
INSERT INTO identity
(provider, provider_user_id, player_id, profile)
VALUES ('facebook', '10001000100010001', '10001000-1000-4000-1000-100010001000', '{ "given_name": "Happy", "last_name": "Facebook" }');

BEGIN;
INSERT INTO player
(id, email, nickname)
VALUES ('20002000-2000-4000-2000-200020002000', 'blargy@blargy.com', 'Blargy');
INSERT INTO identity
(provider, provider_user_id, player_id, profile)
VALUES ('google-oauth2', '200020002000200020000', '20002000-2000-4000-2000-200020002000', '{ "given_name": "Blargy", "last_name": "Blargy" }');
COMMIT;

SELECT * FROM player;
SELECT * FROM identity;

SELECT id, provider, provider_user_id, email, nickname, profile
FROM player, identity
WHERE id = player_id;
