import express from "express";
const router = express.Router();
export default router;

import requireUser from "../middleware/requireUser.js";
import { getAllCharactersByUserId, getCharacterByCharacterId, createCharacter, updateCharacter} from "#db/queries/characters";
import requireBody from "#middleware/requireBody";
import skillsRouter from "./character_skills.js";

router.use(requireUser);

router.get("/", async (req,res) => {
  const characters = await getAllCharactersByUserId(req.user.id);
  res.status(200).send(characters);
})

router.get("/:id", async (req,res) => {
  const {id} = req.params;
  const character = await getCharacterByCharacterId(id);
  if(!character) res.status(400).send("No character by that id!");
  if(character.user_id !== req.user.id) res.status(400).send("No character by that id!");
  res.status(200).send(character);
})

router.post("/", requireBody(["name","clas","attack","health","description"]), async (req,res) => {
  const {name,clas,attack,health,description} = req.body;
  const userId = req.user.id;
  const character = await createCharacter(name,clas,attack,health,description,userId);
  if(!character) res.status(400).send("One or more fields invalid!");
  res.status(200).send(character);
})

router.put("/", requireBody(["name","clas","attack","health","description","userId","id"]), async (req,res) => {
  const {name,clas,attack,health,description,userId,id} = req.body;
  const character = await updateCharacter(name,clas,attack,health,description,userId,id);
  if(!character) res.status(400).send("One or more fields invalid!");
  res.status(200).send(character);
})

router.use("/skills", skillsRouter);