import type { FastifyInstance } from "fastify";
import { getUserById } from "../services/participantService";

export async function participantRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string } }>("/participant/:id", async (request, reply) => {
    const { id } = request.params;

    const numericId = Number.parseInt(id, 10);

    if (Number.isNaN(numericId) || numericId <= 0) {
      return reply.code(400).send({
        success: false,
        error: "Invalid ID: must be a positive integer",
      });
    }

    const user = getUserById(numericId);

    if (!user) {
      return reply.code(404).send({
        success: false,
        error: "No user found with that ID",
      });
    }

    return { success: true, data: user };
  });
}
