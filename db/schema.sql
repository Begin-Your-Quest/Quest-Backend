DROP TABLE IF EXISTS sessions_characters;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS characters_skills;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE characters (
  id serial PRIMARY KEY,
  name text NOT NULL,
  class text NOT NULL,
  attack_stat integer NOT NULL,
  health_stat integer NOT NULL,
  user_id integer unique NOT NULL REFERENCES users(id) on delete cascade
);

CREATE TABLE skills (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  magic_points integer NOT NULL,
  damage integer NOT NULL
);

CREATE TABLE characters_skills (
  id serial PRIMARY KEY,
  character_id integer unique NOT NULL REFERENCES characters(id) on delete cascade,
  skill_id integer unique NOT NULL REFERENCES skills(id) on delete cascade
);

CREATE TABLE sessions (
  id serial PRIMARY KEY,
  dm_id integer unique NOT NULL REFERENCES users(id) on delete cascade,
  name text NOT NULL,
  date date NOT NULL
);

CREATE TABLE sessions_characters (
  id serial PRIMARY KEY,
  session_id integer unique NOT NULL REFERENCES sessions(id) on delete cascade, 
  character_id integer unique NOT NULL REFERENCES characters(id) on delete cascade 
);

