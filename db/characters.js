import client from '../client.js'
export const CreateCharacters = async (characterName) => {
  const sql = `
  INSERT INTO chracter (name, class, attack, health, user_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;

  const { rows: [createdCharacter] } = await client.query(sql, [characterName])
  return createdCharacter
}
