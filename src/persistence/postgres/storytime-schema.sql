CREATE TABLE player (
  id UUID PRIMARY KEY,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  email varchar(128) NOT NULL,
  nickname varchar(64) NOT NULL DEFAULT "Rising Star",
  agreed_to_comms_at timestamp
);

CREATE TABLE identity (
  idp_sub varchar(64) PRIMARY KEY,
  player_id UUID REFERENCES player,
  idp_profile text
);
