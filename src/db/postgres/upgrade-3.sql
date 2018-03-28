-- DATABASE UPGRADES FOR STORYTIME 1.5, PUBLISHING

drop table if exists catalog_genre;
drop table if exists catalog_storyfile;
drop table if exists catalog;
drop table if exists genre;
drop table if exists rating;

create table genre (
  id serial primary key,
  code varchar(16),
  display_name varchar(50),
  sort_order integer
);

create table rating (
  id serial primary key,
  code varchar(16),
  display_name varchar(50),
  sort_order integer
);

create table catalog (
  id serial primary key,
  draft_id varchar(8) not null references story (id),
  version varchar(8) not null,
  story_key varchar(20) not null,
  author_id uuid not null references player (id),
  pen_name varchar(32),
  title varchar(100),
  tag_line varchar(256),
  about text,
  rating integer references rating (id),
  first_scene_id varchar(8),
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

insert into genre (code, display_name, sort_order) values ('adventure', 'Adventure', 1);
insert into genre (code, display_name, sort_order) values ('fantasy', 'Fantasy', 2);
insert into genre (code, display_name, sort_order) values ('scifi', 'Science Fiction', 3);
insert into genre (code, display_name, sort_order) values ('romance', 'Romance', 4);
insert into genre (code, display_name, sort_order) values ('drama', 'Drama', 5);
insert into genre (code, display_name, sort_order) values ('mystery', 'Mystery', 6);
insert into genre (code, display_name, sort_order) values ('satire', 'Satire', 7);
insert into genre (code, display_name, sort_order) values ('historical', 'Historical', 8);
insert into genre (code, display_name, sort_order) values ('biography', 'Biographical', 9);

insert into rating (code, display_name, sort_order) values ('Y', 'All Youth', 1);
insert into rating (code, display_name, sort_order) values ('Y7', 'Older Youth (7+)', 2);
insert into rating (code, display_name, sort_order) values ('G', 'All Audiences', 3);
insert into rating (code, display_name, sort_order) values ('PG', 'Parental Guidance', 4);
insert into rating (code, display_name, sort_order) values ('14', 'Unsuitable Under 14 ', 5);
insert into rating (code, display_name, sort_order) values ('MA', 'Mature Audiences', 6);
