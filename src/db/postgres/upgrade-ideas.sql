-- DATABASE UPGRADES FOR STORYTIME 1.5, PUBLISHING

-- TODO make improvements
create table catalog (
  id serial primary key,
  draft_id varchar(8) not null references story (id),
  version varchar(8) not null,
  story_key varchar(20) not null unique,  -- TODO used as key in story_scene, only url-safe characters, default to draft_id + version
  author_id uuid not null references player (id),
  pen_name varchar(32), -- TODO need convenient way to update
  -- TODO remove below here; use summary instead
  title varchar(100),
  tag_line varchar(256),
  about text,
  first_scene_id varchar(8),
  -- TODO remove above here
  rating integer references system_codes (id), -- TODO default to value of last published version, or 'unrated'
  summary text,
  published_at timestamp
);

create table catalog_genre (
  catalog_id integer not null references catalog (id),
  genre_id integer not null references system_codes (id), -- TODO copy from latest published version
  primary key (catalog_id, genre_id)
);

-- stores scene with its signpost; prevents having to rebuild the signpost every time; single item for reader to request
create table story_scene (
  id serial primary key,
  story_key varchar(20) not null references catalog (story_key),
  scene_id varchar(8),
  scene text
  -- TODO unique index on (story_key, scene_id)
)