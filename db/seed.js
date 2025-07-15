import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createSession } from "#db/queries/sessions";
import { createCharacter } from "./queries/characters.js";
import { createSkill } from "./queries/skills.js";
import { linkSessionsToCharacters } from "./queries/sessions_characters.js";
await db.connect();
await seed();
await db.end();

console.log('creating sessions...')
async function seed() {
  const userOne = await createUser("username", "password");
  for (let i = 1; i <= 5; i++) {
    const session = await createSession(
      userOne.id, 
      `Session Number ${i}`, 
      `2025-07-0${i}`);
      const character = await createCharacter(`char${i}`,"mage",7,4,"Strong strong strong",userOne.id);
  }

  const userTwo = await createUser("username1", "password1");
  for (let i = 6; i <= 10; i++) {
    const session = await createSession(
      userTwo.id, 
      `Session Number ${i}`, 
      `2025-07-0${i}`);
    const character = await createCharacter(`char${i}`,"mage",7,4,"Strong strong strong",userTwo.id);
  }

  console.log('...sessions created')
  for (let i = 1; i <= 5; i++) {
    const record = await linkSessionsToCharacters(1, i);
  }
  for (let i = 6; i <= 10; i++) {
    const record = await linkSessionsToCharacters(2, i);
  }


console.log('creating skills...')
  const crossSlash = await createSkill("Cross Slash", 2, 5, "A tried-and-true hack-and-slash technique.");
  const pommelStrike = await createSkill("Pommel Strike", 1, 1, "Quick attack")
  const fireBlast = await createSkill("Fire Blast", 2, 6, "unleashes an massive explosion.")
  const icicle = await createSkill("Icicle Shot", 1, 3, "A concentrated burst of piercing cold.")
  const carefulAim = await createSkill("Careful Aim", 2, 5, "Pause momentarily to deliver an expert headshot.")
  const quickShot = await createSkill("Quick Shot", 1, 2, "A rapid fire onslaught.")
  const backstab = await createSkill("Backstab", 2, 6, "Sidle up and smile. Hits enemies where they hurt.")
  const throwingKnife = await createSkill("Throwing Knife", 1, 3, "At later levels can be coated with various poisons.")
  const cure = await createSkill("Cure", 2, 6, "Restores health to self and other users.")
  const condemn = await createSkill("Condemn", 2, 6, "Call down divine wrath to smite enemies.")
console.log('...skills created')


console.log("🌱 Database seeded.");
}

