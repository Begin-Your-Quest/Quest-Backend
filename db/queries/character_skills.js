import db from '#db/client';


export async function getSkillsByCharId(userId) {
  const SQL = `SELECT * FROM skills WHERE user_id = $1
  `;
  const { rows: character_skills } = await db.query(SQL, [charId, skillId]);
  return character_skills;
}