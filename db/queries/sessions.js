import db from '#db/client';

export const createSession = async (dmId, name, date) => {
  const sql = `
    INSERT INTO sessions (dm_id, name, date)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows: [session] } = await db.query(sql, [dmId, name, date]);
  return session; 
}

export const getSessionsByUserId = async (id) => {
  const sql = `
    SELECT sessions.* FROM sessions
    WHERE dm_id = $1;
  `;
  const { rows: sessions } = await db.query(sql, [id]);
  return sessions;
}

export const getSessionById = async (id) => {
  const sql =`
    SELECT * FROM sessions
    WHERE id = $1
  `;
  const { rows: [session] } = await db.query(sql,[id]);
  return session;
}

export const updateSessionById = async (id, name, date) => {
  const sql = `
    UPDATE sessions 
    SET name = $2, date = $3 
    WHERE id = $1 
    RETURNING *;
  `;
  const { rows: [session] } = await db.query(sql,[id, name, date]);
  return session;
}

export const removeCharacter = async (id) => {
  const sql = `
    DELETE FROM sessions_characters 
    WHERE character_id = $1
    RETURNING *;
  `;
  const {rows: [character] } = await db.query(sql, [id]);
  return character
}