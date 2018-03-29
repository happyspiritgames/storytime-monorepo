drop view if exists player_status_codes;
drop view if exists genre_codes;
drop view if exists rating_codes;
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
insert into system_codes (code, display_name, sort_order) values ('player-status', 'Player Statuses', 1);
insert into system_codes (code, display_name, sort_order) values ('genre', 'Genres', 2);
insert into system_codes (code, display_name, sort_order) values ('rating', 'Ratings', 3);

-- player-status
insert into system_codes (parent_id, code, display_name, sort_order) values (1, 'active', 'Active', 1);
insert into system_codes (parent_id, code, display_name, sort_order) values (1, 'inactive', 'Inactive', 2);
insert into system_codes (parent_id, code, display_name, sort_order) values (1, 'suspended', 'Suspended', 3);
insert into system_codes (parent_id, code, display_name, sort_order) values (1, 'banned', 'Banned', 4);

-- genre
insert into system_codes (parent_id, code, display_name, sort_order) values (2, 'adventure', 'Adventure', 1);
insert into system_codes (parent_id, code, display_name, sort_order) values (2, 'fantasy', 'Fantasy', 2);
insert into system_codes (parent_id, code, display_name, sort_order) values (2, 'scifi', 'Science Fiction', 3);
insert into system_codes (parent_id, code, display_name, sort_order) values (2, 'romance', 'Romance', 4);
insert into system_codes (parent_id, code, display_name, sort_order) values (2, 'drama', 'Drama', 5);
insert into system_codes (parent_id, code, display_name, sort_order) values (2, 'mystery', 'Mystery', 6);
insert into system_codes (parent_id, code, display_name, sort_order) values (2, 'satire', 'Satire', 7);
insert into system_codes (parent_id, code, display_name, sort_order) values (2, 'historical', 'Historical', 8);
insert into system_codes (parent_id, code, display_name, sort_order) values (2, 'biography', 'Biographical', 9);

-- rating
insert into system_codes (parent_id, code, display_name, sort_order) values (3, 'Y', 'All Youth', 1);
insert into system_codes (parent_id, code, display_name, sort_order) values (3, 'Y7', 'Older Youth (7+)', 2);
insert into system_codes (parent_id, code, display_name, sort_order) values (3, 'G', 'All Audiences', 3);
insert into system_codes (parent_id, code, display_name, sort_order) values (3, 'PG', 'Parental Guidance', 4);
insert into system_codes (parent_id, code, display_name, sort_order) values (3, '14', 'Unsuitable Under 14 ', 5);
insert into system_codes (parent_id, code, display_name, sort_order) values (3, 'MA', 'Mature Audiences', 6);

create view player_status_codes
as select id, code, display_name, sort_order from system_codes
where parent_id=1;

create view genre_codes
as select id, code, display_name, sort_order from system_codes
where parent_id=2;

create view rating_codes
as select id, code, display_name, sort_order from system_codes
where parent_id=3;

select * from player_status_codes;
select * from genre_codes;
select * from rating_codes;
