import db from '#db/client';

export const createCharacterSkills = async(characterId) => {
  const SQL = `
  INSERT INTO character_skills (character_id, skill_id)
  VALUES ($1, $2)
  RETURNING * 
  `;
  const { rows: [createdCharacterSkill] } = await db.query(SQL, [characterId, skillId])
  return createdCharacterSkill
}

export const getAllCharacterSkills = async() => {
  const SQL = `
  SELECT characters.name AS "characterName", skill.name AS "skillName
  FROM character_skills
  JOIN characters ON characters_skills.character_id = characters.id
  JOIN skills ON character_skills.skill_id = skills.id
  `;

  const { rows: currentCharacterSkills } = await db.query(SQL)
  return currentCharacterSkills
}
  