import db from "#db/client"

export async function createSkill(name, image_url, magicPoints, damage, description) {
  const SQL = `
  INSERT INTO skills (name, image_url, magic_points, damage, description)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;

const { 
  rows: [skill] } = await db.query(SQL, [name, image_url, magicPoints, damage, description]);
  return skill
}

export async function getSkills() {
  const SQL = `
  SELECT *
  FROM skills
  `;
  const { 
  rows: skills } = await db.query(SQL);
  return skills;
}

export async function getSkillById(id) {
  const SQL = `
  SELECT * FROM skills WHERE id=$1
  `;
  const {rows: skill } = await db.query(SQL, [id])
  return skill;
}

export async function updateSkillById(id, image_url, name, magicPoints, damage, description) {
  const SQL = ` 
  UPDATE skills SET name=$2, image_url=$3, magic_points=$4, damage=$5, description=$6 WHERE id=$1 RETURNING *`;
  const { rows: [skill] } = await db.query(SQL, [id, name, magicPoints, damage, description]);
return skill;
}

export async function deleteSkill(id) {
  const SQL = `
  DELETE * WHERE id=$1`
  const {rows: skill } = await db.query(SQL, [id])
  return skill;
}

