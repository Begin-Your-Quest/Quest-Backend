import db from '#db/client';

// export async function createCharacterSkill(userId, skillId) {
//   const SQL = `
//   INSERT INTO character_skills (user_id, skill_id)
//   VALUES ($1, $2)
//   RETUNRING *;
//   `;

//   const {
//     rows: [character_skills],
//   } = await db.query(SQL, [userId, skillId]);
// }
export async function getSkillsByUserId(userId) {
  const SQL = `SELECT * FROM skills WHERE user_id = $1
  `;
  const { rows: character_skills } = await db.query(SQL, [userId, skillId]);
  return character_skills;
}