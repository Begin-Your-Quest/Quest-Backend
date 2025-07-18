import express from 'express';
const sessionsRouter = express.Router();
export default sessionsRouter;

import requireUser from '#middleware/requireUser';
import { getSessionsByUserId, getSessionById, createSession, updateSessionById, removeCharacter } from '#db/queries/sessions';
import requireBody from '#middleware/requireBody';
import { getCharactersBySessionId, linkSessionsToCharacters } from '#db/queries/sessions_characters';

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

sessionsRouter.get(`/:id/characters`, async (request, response) => {
  const { id } = request.params;
  const characters = await getCharactersBySessionId(id);
  if(!characters) return response.send(`NO CHARACTERS ADDED`);
  response.send(characters)
});

sessionsRouter.post(`/:id/characters`,
  requireBody(["sessionId", "characterId"]),
  async (request, response) => {
    const { id } = request.params;
    const { sessionId, characterId} = request.body;
    const sessionRecord = await linkSessionsToCharacters(sessionId, characterId);
    response.send(sessionRecord)
  }
);

sessionsRouter.delete(`/:id/characters`,
  requireBody(["characterId"]),
  async (request, response) => {
    const { characterId } = request.body;
    const removedCharacter = await removeCharacter(characterId);
    response.send(removedCharacter);
  }
)

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