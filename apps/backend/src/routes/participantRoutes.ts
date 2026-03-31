import { type TaskData, TaskTypes } from "@pitch-experiment/types";
import type { FastifyInstance } from "fastify";
import { CONFIG } from "../config.js";
import { participantQueries } from "../db/queries.js";
import {
  createParticipant,
  generateParticipantCode,
  isCodeActivated,
} from "../services/participantService.js";
import { processINMData, processLearningData } from "../services/trialService.js";

const DEFAULT_CODE = "323jf92d";

interface queryStringParameters {
  firstname: string;
  lastname: string;
  birthday: number;
  birthcity: string;
}

export async function participantRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: queryStringParameters }>("/participant", async (request, reply) => {
    const { firstname, lastname, birthday, birthcity }: queryStringParameters = request.query;

    request.log.info(`[Participant] Incoming request from IP: ${request.ip}`);

    const code = generateParticipantCode(firstname, lastname, birthday, birthcity);
    const changes = createParticipant(code);

    if (changes === 0) {
      return reply.code(400).send({ success: false, error: "t deja la" });
    }

    return reply.redirect(CONFIG.FRONTEND_URL);
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

    try {
      if (payload.taskType === TaskTypes.INM) {
        processINMData(payload.participantCode, payload.data);
        if (payload.participantCode !== DEFAULT_CODE)
          participantQueries.desactivateCode(payload.participantCode);
      } else if (payload.taskType === TaskTypes.Learning) {
        processLearningData(payload.participantCode, payload.data);
      }
    } catch (e) {
      fastify.log.error(`There was an error saving the trials data to the DB: ${e}`);
      return reply.send({ success: false, error: e });
    }

    return reply.send({ success: true, message: "Successfully saved task data to the server" });
  });
}
