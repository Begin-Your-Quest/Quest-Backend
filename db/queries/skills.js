import db from "db/client"

export async function createSkill(name, magicPoints, damage) {
  const SQL = `
  INSERT INTO skills (name, magic_points, damage)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

const {
  rows: [tasks],
  } = db.query(SQL, [name, magicPoints, damage]);
}

export async function getSkillsByUserId(skillId) {
  const SQL = `SELECT * FROM skills WHERE skill_id = `
}

// create skill get all skills 
// skill by character id