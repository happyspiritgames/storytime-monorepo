DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS player_role;

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20)
);

CREATE TABLE player_role (
  player_id UUID REFERENCES player (id),
  role_id INTEGER REFERENCES role (id),
  PRIMARY KEY (player_id, role_id)
);

INSERT INTO role (name) VALUES ('admin');
INSERT INTO role (name) VALUES ('author');
INSERT INTO role (name) VALUES ('player');

--give every existing 'player' role
INSERT INTO player_role
SELECT player.id as player_id, role.id as role_id
FROM player, role
WHERE role.name='player';

--give my google account 'admin' role
INSERT INTO player_role
SELECT player.id as player_id, role.id as role_id
FROM player, identity, role
WHERE email = 'davemount@gmail.com'
  AND player.id = identity.player_id
  AND provider = 'google-oauth2'
  AND role.name='admin';

-- make it possible to suspend or remove (mark for removal) a player
CREATE TABLE player_status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  display_name VARCHAR(20)
);

-- active status must be first (otherwise, adjust default value for player.status_id)
INSERT INTO player_status (name, display_name) VALUES ('active', 'Active');
INSERT INTO player_status (name, display_name) VALUES ('suspended', 'Suspended');
INSERT INTO player_status (name, display_name) VALUES ('deleted', 'Deleted');

ALTER TABLE player ADD COLUMN status_id INTEGER NOT NULL
DEFAULT 1 REFERENCES player_status (id);
