import db from "#db/client";

export const createSkill = async (name, magicPoints, damage) => {
  const sql = `
    INSERT INTO skills (name, magic_points, damage)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows: [skill] } = await db.query(sql, [name, magicPoints, damage]);
  return skill;
}