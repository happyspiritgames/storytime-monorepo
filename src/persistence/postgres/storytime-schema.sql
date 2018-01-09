CREATE TABLE member (
  id UUID PRIMARY KEY,
  created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  email varchar(128) NOT NULL,
  nickname varchar(64) NOT NULL,
  facebook_id varchar(128),
  facebook_user_info text,
  google_id varchar(128),
  google_user_info text,
  agree_members_only_comms timestamp,
  agree_author_terms timestamp,
  marked_for_archive timestamp
);

CREATE TABLE identity_provider (
  id integer PRIMARY KEY,
  provider_key varchar(48),
  provider_name varchar(48)
)

// one record for each user-identity_provider combination;
// store everything received from provider as JSON in member_info;
// delete member_token (?) when logged out;
// delete record when asked to be forgotten
// TODO figure out how to remember that someone left -- event log?
CREATE TABLE identity (
  member_id UUID, (member_fk)
  identity_provider_id integer,
  registered_at timestamp,
  member_token varchar(64),
  profile_info text
)

// google profile from ID token includes: email, emailVerified (bool), name, picture, locale, familyName, givenName