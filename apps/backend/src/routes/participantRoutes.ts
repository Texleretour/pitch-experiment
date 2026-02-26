import type { FastifyInstance } from "fastify";
import {
  createParticipant,
  generateParticipantCode,
  isCodeActivated,
} from "../services/participantService";

interface queryStringParameters {
  firstname: string;
  lastname: string;
  birthday: number;
  birthcity: string;
}

export async function participantRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: queryStringParameters }>("/participant", async (request, reply) => {
    const { firstname, lastname, birthday, birthcity }: queryStringParameters = request.query;

    const code = generateParticipantCode(firstname, lastname, birthday, birthcity);
    const changes = createParticipant(code);

    if (changes === 0) {
      return reply.code(400).send({ success: false, error: "t deja la" });
    }

    return reply.send({ success: true, data: { newRows: changes } });
  });

  fastify.get<{ Params: { code: string } }>("/code/:code", async (request, reply) => {
    const { code } = request.params;

    if (!isCodeActivated(code)) {
      return reply.send({
        success: false,
        error: `Code '${code}' is not active (or does not exist)`,
      });
    }

    return reply.send({ success: true, data: code });
  });
}
