import db from "#db/client";

export const getAllCharactersByUserId = async (userId) => {
  const sql = `select * from characters where user_id=$1`;
  const {rows: characters} = await db.query(sql,[userId]);
  return characters;
};

export const getCharacterByCharacterId = async (characterId) => {
  const sql = `select * from characters where id=$1`;
  const {rows: character} = await db.query(sql, [characterId]);
  return character;
};