-- DATABASE UPGRADES FOR STORYTIME 1.5, PUBLISHING

drop table if exists catalog_genre;
drop table if exists catalog_storyfile;
drop table if exists catalog;
drop table if exists genre;
drop table if exists rating;

create table genre (
  id integer primary key,
  code varchar(10),
  display_name varchar(16),
  sort_order integer
);

create table rating (
  id integer primary key,
  code varchar(10),
  display_name varchar(16),
  sort_order integer
);

create table catalog (
  id integer primary key,
  version varchar(8) not null,
  story_key varchar(20) not null,
  author_id uuid not null references player (id),
  pen_name varchar(32),
  title varchar(100),
  tag_line varchar(256),
  about text,
  first_scene_id varchar(8),
  rating integer references rating (id),
  published_at timestamp
);

create table catalog_genre (
  catalog_id integer not null references catalog (id),
  genre_id integer not null references genre (id),
  primary key (catalog_id, genre_id)
);

create table catalog_storyfile (
  catalog_id integer not null references catalog (id),
  story_filename varchar(100)
);
