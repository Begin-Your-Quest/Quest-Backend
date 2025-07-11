import express from "express";
import requireUser from "#middleware/requireUser.js";
import { getSkillsByCharacterId }  from "#db/queries/skills.js";

const router = express.Router();


router
.route("/")
.get(async (req, res) => {
  const skills = await getCharracterSkillsByUserId(req.skill.userId);
  res.send(skills)
})

router
.param("/:id", async(req, res, next, id) => {
  const order = await getCharracterSkillsByUserId(id);
  if(!characterSkills) return res.status(404).send("character skills not found")
    req.characterSkills = characterSkills;
  next()
});

router
.route("/:id").get((req, res) => {
  if (req.user.id !== req.characterSkills.userId) {
    return res.status(403).send("you are not authorized to view these character skills")
  }
  res.send(req.characterSkills)
});

export default router;

