import express from "express";
import { 
  getSkills, 
  getSkillById, 
  createSkill, 
  updateSkillById as updateSkill,
} from "#db/queries/skills";
import requireBody from "#middleware/requireBody";

const router = express.Router();

router
.get("/", async (req, res, next) => {
    const skills = await getSkills(); 
    res.status(200).json(skills);  
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
.get("/:id", async (req, res, next) => {
    const skill = await getSkillById(req.params.id);
    if (!skill) return res.status(404).send("No skill found");
    res.status(200).json(skill);
  })



router
.put("/", requireBody(["name", "magic_points", "damage", "description"]), async (req, res) =>{
  const {name, magicPoints, damage, description, skillId} = req.body;
  const skill = await updateSkillById(name, magicPoints, damage, description, skillId)
  if(!skill) res.status(400).send("improper entry, please try again...");
  res.status(200).send(skill);
})

export default router;

