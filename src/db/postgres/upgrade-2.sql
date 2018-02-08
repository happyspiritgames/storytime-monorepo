-- DATABASE UPGRADES FOR STORYTIME 1.4
-- for players who are authors
--alter table player add column agreed_to_terms_of_author timestamp;  -- grant role on agreement
--alter table player add column penName varchar(32);

drop table if exists signpost;
drop table if exists scene;
drop table if exists story;

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
-- TODO why not allow two options with the same destination?  then again, why?

--insert into player_role values ('8a095fb3-8cd3-475b-a3c2-a842bac9ee39', 2);
--INSERT INTO player_role
--SELECT player.id as player_id, role.id as role_id
--FROM player, identity, role
--WHERE email = 'davemount@gmail.com'
--  AND player.id = identity.player_id
--  AND provider = 'google-oauth2'
--  AND role.name='author';
