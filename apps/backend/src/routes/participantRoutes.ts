import { type TaskData, TaskTypes } from "@pitch-experiment/types";
import type { FastifyInstance } from "fastify";
import { frontendUrl } from "../../config.json";
import {
  createParticipant,
  generateParticipantCode,
  isCodeActivated,
} from "../services/participantService";
import { processINMData } from "../services/trialService";

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

    return reply.redirect(frontendUrl);
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

  fastify.post("/participant/data", async (request, reply) => {
    const payload = request.body as TaskData;
    console.log("payload:", payload);

    try {
      if (payload.taskType === TaskTypes.INM) {
        processINMData(payload.participantCode, payload.data);
      }
    } catch (e) {
      reply.send({ success: false, error: e });
    }

    reply.send({ success: true, message: "Successfully saved task data to the server" });
  });
}
