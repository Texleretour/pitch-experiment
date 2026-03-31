import type { FastifyInstance } from "fastify";
import { CONFIG } from "../config.js";
import { trialQueries } from "../db/queries.js";

interface queryStringParameters {
  token: string;
}

export default function adminRoutes(fastify: FastifyInstance) {
  fastify.addHook<{ Querystring: queryStringParameters }>("preHandler", async (request, reply) => {
    const token = request.query.token;

    if (token !== CONFIG.ADMIN_TOKEN) {
      return reply.code(403).send({ error: "Unauthorized" });
    }
  });
  fastify.get("/admin/data", async (_request, reply) => {
    const { participants, learningData, INMData } = trialQueries.getAllTrials();

    const data = {
      exportDate: new Date().toISOString(),
      participants: participants,
      learningData: learningData,
      INMData: INMData,
    };

    reply
      .header("Content-Disposition", `attachment; filename="experiment-data-${Date.now()}.json"`)
      .header("Content-Type", "application/json")
      .send(data);
  });

  fastify.get("/admin/stats", async (_request, reply) => {
    try {
      const { participantCount, learningTrialsCount, INMTrialsCount } =
        trialQueries.getTrialStats();

      const data = {
        participants: participantCount.count,
        learningTrialsCount: learningTrialsCount.count,
        INMTrialsCount: INMTrialsCount.count,
        lastUpdate: new Date().toISOString(),
      };

      return reply.send({ success: true, data: data });
    } catch (e) {
      console.error("Could not retrieve data:", e);
      reply.send({ success: false, error: "There was an error retrieving the statistics" });
    }
  });
}
