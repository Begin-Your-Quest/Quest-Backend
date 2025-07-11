import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createSession } from "#db/queries/sessions";
import { createCharacter } from "./queries/characters.js";


await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const userOne = await createUser("username", "password");
  for (let i = 1; i <= 5; i++) {
    const session = await createSession(
      userOne.id, 
      `Session Number ${i}`, 
      `2025-07-0${i}`);
      const character = await createCharacter(`char${i}`,"mage",7,4,userOne.id);
  }

  const userTwo = await createUser("username1", "password1");
  for (let i = 6; i <= 10; i++) {
    const session = await createSession(
      userTwo.id, 
      `Session Number ${i}`, 
      `2025-07-0${i}`);
    const character = await createCharacter(`char${i}`,"mage",7,4,userTwo.id);
  }

}
