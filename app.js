import express from "express";
const app = express();
export default app;

import usersRouter from "#api/users";
import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";
import cors from "cors";
import morgan from "morgan";
import sessionsRouter from "#api/sessions";
import charactersRouter from "#api/characters";
import skillsRouter from "#api/skills";
import discordRouter from "#api/discord";

app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.get("/", (req, res) => res.send("Begin Your Quest!"));

app.use("/users", usersRouter);
app.use(`/sessions`, sessionsRouter)
app.use("/characters", charactersRouter);
app.use("/skills", skillsRouter);
app.use("/discord", discordRouter);

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
