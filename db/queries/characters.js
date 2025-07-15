import db from "#db/client";

export const createCharacter = async (name,clas,attack,health,description,userId) => {
  const sql = `insert into characters (name,class,attack_stat,health_stat,description,user_id)
  values ($1,$2,$3,$4,$5,$6)
  returning *`;
  const {rows: [character]} = await db.query(sql, [name,clas,attack,health,description,userId]);
  return character;
};

export const getAllCharactersByUserId = async (userId) => {
  const sql = `select * from characters where user_id=$1`;
  const {rows: characters} = await db.query(sql,[userId]);
  return characters;
};

export const getCharacterByCharacterId = async (characterId) => {
  const sql = `select * from characters where id=$1`;
  const {rows: [character]} = await db.query(sql, [characterId]);
  return character;
};

export const updateCharacter = async (name,clas,attack,health,description,userId, id) => {
  const sql = `update characters set name=$1, class=$2, attack_stat=$3, health_stat=$4, description=$5 where user_id=$6 and id=$7 returning *`;
  const {rows: [character]} = await db.query(sql,[name,clas,attack,health,description,userId,id]);
  return character;
};