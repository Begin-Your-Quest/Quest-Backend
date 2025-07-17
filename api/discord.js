
import express from "express";
import requireBody from "#middleware/requireBody";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post(
  "/create",
  requireBody(["name", "description", "sessionId"]),
  async (req, res, next) => {
    try {
      const { name, description, sessionId } = req.body;

      // TODO: Implement actual Discord server creation logic here
      // This is a placeholder that simulates server creation
      const code = uuidv4().slice(0, 6);
      const inviteUrl = `https://discord.gg/${code}`;

      res.status(201).json({ inviteUrl });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
