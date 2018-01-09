
-- create account
INSERT INTO member
(id, email, nickname, facebook_id, google_id, agree_members_only_comms)
VALUES ('b8de254b-6a98-468b-bfdb-51c27506e4b0', 'bubba@happyspiritgames.com',
  'bubba gump', '??facebook??', '??google??', NOW());

-- update email
UPDATE member
SET email = $2
WHERE id = $1

-- update nickname
UPDATE member
SET nickname = $2
WHERE id = $1

-- login facebook
UPDATE member
SET facebook_id = $2
WHERE id = $1

-- forget facebook login (logout?)
UPDATE member
SET facebook_id = DEFAULT
WHERE id = $1

-- login google
UPDATE member
SET google_id = $2
WHERE id = $1

-- forget google login (logout?)
UPDATE member
SET google_id = DEFAULT
WHERE id = $1

-- agree to communications
UPDATE member
SET agree_members_only_comms = NOW()
WHERE id = $1

-- refuse communications
UPDATE member
SET agree_members_only_comms = DEFAULT
WHERE id = $1
