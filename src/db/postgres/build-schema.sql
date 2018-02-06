DROP TABLE IF EXISTS identity;
DROP TABLE IF EXISTS player;

CREATE TABLE player (
  id UUID PRIMARY KEY,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  email varchar(128) NOT NULL,
  nickname varchar(64) NOT NULL,
  agreed_to_comms_at timestamp
);

CREATE TABLE identity (
  provider varchar(16),
  provider_user_id varchar(32),
  player_id UUID,
  profile text,
  PRIMARY KEY (provider, provider_user_id)
);

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

