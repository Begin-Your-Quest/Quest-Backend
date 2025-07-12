import express from "express";
import { 
  getAllSkills, 
  getSkillById, 
  createSkill, 
  updateSkill, 
  deleteSkill 
} from "#db/queries/skills.js";
import requireBody from "#middleware/requireBody.js";

const router = express.Router();


router.get("/", async (req, res, next) => {
  try {
    const skills = await getAllSkills();
    res.json(skills);
  } catch (err) { next(err); }
});


router.get("/:id", async (req, res, next) => {
  try {
    const skill = await getSkillById(req.params.id);
    res.json(skill);
  } catch (err) { next(err); }
});


router.post(
  "/", 
  requireBody("name", "magic_points", "damage"),
  async (req, res, next) => {
    try {
      const newSkill = await createSkill(req.body);
      res.status(201).json(newSkill);
    } catch (err) { next(err); }
  }
);


router.patch("/:id", async (req, res, next) => {
  try {
    const updated = await updateSkill(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
});


router.delete("/:id", async (req, res, next) => {
  try {
    await deleteSkill(req.params.id);
    res.sendStatus(204);
  } catch (err) { next(err); }
});

export default router;

