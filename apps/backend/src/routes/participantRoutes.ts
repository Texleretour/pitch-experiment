import type { FastifyInstance } from "fastify";
import {
  createParticipant,
  does_access_code_exist,
  generateParticipantCode,
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

    const existance_code = does_access_code_exist(code);

    if (!existance_code) {
      return reply.send({ access_code: code, existance: false });
    }

    return reply.send({ access_code: code, existance: true });
  });
}
