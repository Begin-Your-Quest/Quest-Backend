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
.post(requireBody(["name", "magic_points", "damage"]), async(req, res) => {
  const { name, magicPoints, damage } = req.body;
  const skill = await createSkill(name, getSkillByMagicPoints, damage);
  res.status(201).send(skill)
})

router
.route("/id").put(requireBody(["name", "magic_points", "damage"]), async(req, res) => {
  const { name, magicPoints, damage } = req.body;
  const skill = await updateSkillById(name, magicPoints, damage);
  res.status(201).send(skill)
})