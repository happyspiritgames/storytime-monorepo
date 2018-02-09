DROP TABLE IF EXISTS identity;
DROP TABLE IF EXISTS player;
drop table if exists signpost;
drop table if exists scene;
drop table if exists story;

CREATE TABLE player_status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  display_name VARCHAR(20)
);

CREATE TABLE player (
  id UUID PRIMARY KEY,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  email varchar(128) NOT NULL,
  nickname varchar(64) NOT NULL,
  status_id INTEGER NOT NULL DEFAULT 1 REFERENCES player_status (id),
  agreed_to_comms_at timestamp,
  agreed_to_author_at timestamp,
  penname varchar(32)
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

-- active status must be first (otherwise, adjust default value for player.status_id)
INSERT INTO player_status (name, display_name) VALUES ('active', 'Active');
INSERT INTO player_status (name, display_name) VALUES ('suspended', 'Suspended');
INSERT INTO player_status (name, display_name) VALUES ('deleted', 'Deleted');

ALTER TABLE player ADD COLUMN status_id INTEGER NOT NULL
DEFAULT 1 REFERENCES player_status (id);

create table story (
  id varchar(8) primary key,
  author_id uuid not null references player (id),
  title varchar(100) not null,
  tag_line varchar(256),
  about text,
  first_scene_id varchar(8),
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table scene (
  id varchar(8) not null unique,
  story_id varchar(8) references story (id),
  title varchar(100),
  prose text,
  end_of_scene_prompt text,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp,
  primary key(id, story_id)
);

create table signpost (
  scene_id varchar(8) not null references scene (id),
  destination_id varchar(8) not null references scene (id),
  teaser varchar(256),
  sign_order smallint,
  primary key (scene_id, destination_id)
);