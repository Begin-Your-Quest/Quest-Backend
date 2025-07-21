import express from "express";
import requireBody from "#middleware/requireBody";
import { linkSkillsToCharacters} from "#db/queries/character_skills";

const router = express.Router();


router
.route("/")
.get(async (req, res) => {
  const skills = await getCharracterSkillsById(req.skill.userId);
  res.send(skills)
})

router
.param("/:id", async(req, res, next, id) => {
  const order = await getCharracterSkillsById(id);
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

router
.route(`/:id`)
  .post( requireBody(["skillId", "characterId"]),
    async (request, response) => {
      const { skillId, characterId} = request.body;
      const skillRecord = await linkSkillsToCharacters(skillId, characterId);
      response.send(skillRecord)
    }
  )


export default router;

