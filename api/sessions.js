import express from 'express';
const sessionsRouter = express.Router();
export default sessionsRouter;

import requireUser from '#middleware/requireUser';
import { getSessionsByUserId, getSessionById, createSession, updateSessionById } from '#db/queries/sessions';
import requireBody from '#middleware/requireBody';

sessionsRouter.use(requireUser);

sessionsRouter.get(`/`, async (request, response) => {
  const userId = request.user.id;
  const sessions = await getSessionsByUserId(userId);
  response.send(sessions);
});

sessionsRouter.get(`/:id`, async (request, response) => {
  const { id } = request.params;
  const session = await getSessionById(id);
  if(!session) return response.status(404).send(`THE SESSION DOES NOT EXIST.`);
  if(session.dm_id !== request.user.id) return response.status(404).send(`THE SESSION DOES NOT EXIST.`);
  response.send(session)
});

sessionsRouter.post(`/`,
  requireBody(["dmId", "name", "date"]),
  async (request, response) => {
    const { dmId, name, date } = request.body;
    const userId = request.user.id;
    const session = await createSession(userId, name, date)
    response.send(session)
  }
);

sessionsRouter.put(`/:id`,
  requireBody(["name", "date"]),
  async (request, response) => {
    const { id } = request.params;
    const { name, date } = request.body;
    const session = await getSessionById(id);
    if(request.user.id !== session.dm_id) return response.status(404).send(`USER DOES NOT OWN THE SESSION.`);
    const updatedSession = await updateSessionById(id, name, date);
    response.send(updatedSession);
  }
)