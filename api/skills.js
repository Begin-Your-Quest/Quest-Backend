import express from "express";
import { 
  getAllSkills, 
  getSkillById, 
  createSkill, 
  updateSkill, 
} from "#db/queries/skills.js";
import requireBody from "#middleware/requireBody.js";

const router = express.Router();

router
.get("/", async (req, res, next) => {
  const skills = await getAllSkills(req.skill.id);
  res.status(200).send({data: skills});
})
router
.post( "/", 
  requireBody("name", "magic_points", "damage"),
  async (req, res, next) => {
  const {name, magicPoints, damage, description} = req.body;
  const skill = await createSkill(name, magicPoints, damage, description);
  if(!skill) res.status(400).send("improper entry, please try again...");
  res.status(200).send(skill);
});


router
.get("/:id", async (req, res) => {
  const {id} = req.params;
  const skill = await getSkillById(id);
  if(!skill) res.status(400).send("No skill found...");
  if(skill.skill_id !== req.skill.id) res.status(400).send("No skill found...");
  res.status(200).send(skill);
})



router
.put("/", requireBody(["name", "magicPoints", "damage", "description"]), async (req, res) =>{
  const {name, magicPoints, damage, description, skillId} = req.body;
  const skill = await updateSkill(name, magicPoints, damage, description, skillId)
  if(!skill) res.status(400).send("improper entry, please try again...");
  res.status(200).send(skill);
})

export default router;

