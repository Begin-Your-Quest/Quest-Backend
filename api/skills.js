import express from "express";
import requireBody from "#middleware/requireUser";

const router = express.Router();
export default router;


router
.route("/")
.get(async (req, res) => {
  const skills = await getSkillsById(req.skills.id)
  res.send(skills);
})

router
.post(requireBody(["name", "magic_points", "damage", "description"]), async(req, res) => {
  const { name, magicPoints, damage, description } = req.body;
  const skill = await createSkill(name, magicPoints, damage, description);
  res.status(201).send(skill)
})

router
.route("/id").put(requireBody(["name", "magic_points", "damage", "description"]), async(req, res) => {
  const { name, magicPoints, damage, description } = req.body;
  const skill = await updateSkillById(name, magicPoints, damage, description);
  res.status(201).send(skill)
})


