import client from '../client.js'
export const createCharacters = async (name, clas,attack, health, userId ) => {
  const sql = `
  INSERT INTO chracter (name, class, attack, health, user_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;

  const { rows: [createdCharacter] } = await client.query(sql, [name, clas, attack, health, userId])
  return createdCharacter
}
