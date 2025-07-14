import db from "#db/client";

export async function createSessionCharacters(sessionId, characterId) {
  const SQL = `
  INSERT INTO sessions_characters(session_id, character_id)
  VALUES ($1, $2)
  RETURNING *`;
  const { rows: [sessionCharacters] } = await db.query(SQL, [sessionId, characterId]);
  return sessionCharacters;
}

export async function getSessionCharactersBySessionId(sessionId) {
  const SQL = `
  SELECT * FROM session_id WHERE session_id=$1`
  const { rows: sessionCharacters } = await db.query(SQL, [sessionId]);
  return sessionCharacters;
}

export async function getSessionCharactersByCharacterId(characterId) {
  const SQL = `
  SELECT * FROM session_chearacters WHERE character_id=$2`;
  const { rows: sessionCharacters } = await db.query(SQL, [characterId]);
  return sessionCharacters
}

export async function updateSessionCharactersBySessionId(sessionId, characterId) {
const SQL = `
UPDATE session_characters SET character_id=$2 WHERE session_id=$1`;
const { rows: [sessionCharacters] } = await db.query(SQL, [sessionId, characterId]);
return sessionCharacters;
}