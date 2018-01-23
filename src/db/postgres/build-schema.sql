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
