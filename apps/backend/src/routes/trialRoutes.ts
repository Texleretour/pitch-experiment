import type { FastifyInstance } from "fastify";

export async function trialRoutes(fastify: FastifyInstance) {
  fastify.post("/trial", async (request, reply) => {
    const data = request.body;
    console.log(data);

    return reply.send({ success: true, newRows: 1 });
  });
}
