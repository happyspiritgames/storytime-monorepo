-- DATABASE UPGRADES FOR STORYTIME 1.5, PUBLISHING

drop table if exists edition_scene;
drop table if exists edition_genre;
drop table if exists edition;
drop view if exists player_status_codes;
drop view if exists genre_codes;
drop view if exists rating_codes;
drop view if exists edition_status_codes;
drop table if exists system_codes;

create table system_codes (
  id serial primary key,
  parent_id integer,
  code varchar(20),
  display_name varchar(50),
  sort_order integer,
  foreign key (parent_id) references system_codes(id)
);

-- types of codes
insert into system_codes (code, display_name, sort_order)
values
  ('player-status', 'Player Statuses', 1),
  ('genre', 'Genres', 2),
  ('rating', 'Ratings', 3),
  ('edition-status', 'Story Edition Status', 4);

-- views, one per type
create view player_status_codes
as select id, code, display_name, sort_order from system_codes
where parent_id=1;

create view genre_codes
as select id, code, display_name, sort_order from system_codes
where parent_id=2;

create view rating_codes
as select id, code, display_name, sort_order from system_codes
where parent_id=3;

create view edition_status_codes
as select id, code, display_name, sort_order from system_codes
where parent_id=4;

-- player-status
insert into system_codes (parent_id, code, display_name, sort_order)
values
  (1, 'active', 'Active', 1),
  (1, 'inactive', 'Inactive', 2),
  (1, 'suspended', 'Suspended', 3),
  (1, 'banned', 'Banned', 4);

-- genre
insert into system_codes (parent_id, code, display_name, sort_order)
values
  (2, 'adventure', 'Adventure', 1),
  (2, 'fantasy', 'Fantasy', 2),
  (2, 'scifi', 'Science Fiction', 3),
  (2, 'romance', 'Romance', 4),
  (2, 'drama', 'Drama', 5),
  (2, 'mystery', 'Mystery', 6),
  (2, 'satire', 'Satire', 7),
  (2, 'historical', 'Historical', 8),
  (2, 'biography', 'Biographical', 9);

-- rating
insert into system_codes (parent_id, code, display_name, sort_order)
values
  (3, 'Y', 'All Youth', 1),
  (3, 'Y7', 'Older Youth (7+)', 2),
  (3, 'G', 'All Audiences', 3),
  (3, 'PG', 'Parental Guidance', 4),
  (3, '14', 'Unsuitable Under 14 ', 5),
  (3, 'MA', 'Mature Audiences', 6);

-- edition-status
insert into system_codes (parent_id, code, display_name, sort_order)
values
  (4, 'proof', 'Proofing', 1),
  (4, 'review', 'In Review', 2),
  (4, 'available', 'Available', 3),
  (4, 'hold', 'On Hold', 4),
  (4, 'withdrawn', 'Out of Circulation', 5),
  (4, 'removed', 'Gone', 6);

create table edition (
  id serial primary key,
  edition_key varchar(20) not null unique,
  story_id varchar(8) not null references story (id),
  version varchar(8) not null,
  status integer not null references system_codes (id),
  summary text,
  rating integer references system_codes (id),
  published_at timestamp
);

create table edition_genre (
  edition_id integer not null references edition (id),
  genre_id integer not null references system_codes (id),
  primary key (edition_id, genre_id)
);

create table edition_scene (
  id serial primary key,
  edition_id integer not null references edition (id),
  scene_id varchar(8),
  scene text
);
