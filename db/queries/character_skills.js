import db from '#db/client';

export async function getAllSkills() {
  const { rows } = await db.query("SELECT * FROM skills ORDER BY name");
  return rows;
}

export async function getSkillById(id) {
  const { rows: [skill] } = await db.query(
    "SELECT * FROM skills WHERE id = $1",
    [id]
  );
  return skill;
}

export async function createSkill({ name, magic_points, damage }) {
  const {
    rows: [skill]
  } = await db.query(
    `INSERT INTO skills(name, magic_points, damage)
     VALUES ($1,$2,$3)
     RETURNING *;`,
    [name, magic_points, damage]
  );
  return skill;
}

export async function updateSkill(id, fields) {
  const setParts = [];
  const values = [];
  let idx = 1;
  for (const [col, val] of Object.entries(fields)) {
    setParts.push(`${col} = $${idx}`);
    values.push(val);
    idx++;
  }
  if (setParts.length === 0) return getSkillById(id);

  const sql = `UPDATE skills
               SET ${setParts.join(", ")}
               WHERE id = $${idx}
               RETURNING *;`;
  values.push(id);

  const { rows: [skill] } = await db.query(sql, values);
  return skill;
}

export async function deleteSkill(id) {
  await db.query("DELETE FROM skills WHERE id = $1", [id]);
}
