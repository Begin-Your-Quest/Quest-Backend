import express from "express";
const router = express.Router();
export default router;

import requireUser from "../middleware/requireUser.js";
import { getAllCharactersByUserId, getCharacterByCharacterId, createCharacter, updateCharacter} from "#db/queries/characters";
import requireBody from "#middleware/requireBody";

router.use(requireUser);

router.get("/", async (req,res) => {
  const characters = await getAllCharactersByUserId(req.user.id);
  res.status(200).send({data: characters});
})

router.get("/:id", async (req,res) => {
  const {id} = req.params;
  const character = await getCharacterByCharacterId(id);
  if(!character) res.status(400).send("No character by that id!");
  if(character.user_id !== req.user.id) res.status(400).send("No character by that id!");
  res.status(200).send(character);
})

router.post("/", requireBody(["name","clas","attack","health","userId"]), async (req,res) => {
  const {name,clas,attack,health,userId} = req.body;
  const character = await createCharacter(name,clas,attack,health,userId);
  if(!character) res.status(400).send("One or more fields invalid!");
  res.status(200).send(character);
})

router.put("/", requireBody(["name","clas","attack","health","userId"]), async (req,res) => {
  const {name,clas,attack,health,userId} = req.body;
  const character = await updateCharacter(name,clas,attack,health,userId);
  if(!character) res.status(400).send("One or more fields invalid!");
  res.status(200).send(character);
})