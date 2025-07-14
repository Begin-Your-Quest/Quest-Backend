import db from "#db/client";

export const linkSessionsToCharacters = async (sessionId, characterId) => {
  const sql = `
    INSERT INTO sessions_characters (session_id, character_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const { rows: [record] } = await db.query(sql, [sessionId, characterId]);
  return record;
}

export const getCharactersBySessionId = async (id) => {
  const sql = `
    SELECT sessions.name, characters.* FROM sessions 
    JOIN sessions_characters ON sessions.id = sessions_characters.session_id 
    JOIN characters ON characters.id = sessions_characters.character_id 
    WHERE session_id = $1;
  `;
  const {rows: characters} = await db.query(sql, [id]);
  return characters
}