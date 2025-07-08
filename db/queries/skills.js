import db from "db/client"

export async function createSkill(name, magicPoints, damage) {
  const SQL = `
  INSERT INTO skills (name, magic_points, damage)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

const {
  rows: [skills],
  } = db.query(SQL, [name, magicPoints, damage]);
}

export async function getSkillByMagicPoints(magicPoints) {
  const SQL = `SELECT * FROM skills WHERE magic_points =$2`
  const { rows: [skills] } = await db.query(SQL, [magicPoints]);
  return skills
}

export async function getSkillByDamage(damage) {
  const SQL = `SELECT * FROM skills WHERE damge = $3`;
  const { rows: [skills] } = await db.query(SQL, [damage]);
  return skills;
}

export async function updateSkillByID(id, name, magicPoints, damage) {
  const SQL = ` 
  UPDATE skills SET name=$2, magic_points=$3, damage=$4 WHERE id=$1 RETURNING *`;
  const { rows: [skill] } = await db.query(SQL, [id, name, magicPoints, damage]);
return skill;
}