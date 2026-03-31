import cors from "@fastify/cors";
import Fastify from "fastify";
import { CONFIG } from "./config.js";
import adminRoutes from "./routes/adminRoutes.js";
import { participantRoutes } from "./routes/participantRoutes.js";

const fastify = Fastify({ logger: true });

const devCorsUrls = [
  "http://localhost:5173", // Vite dev
  "http://localhost:4173", // Vite preview (build)
];

const corsUrls = [...devCorsUrls, CONFIG.FRONTEND_URL];
await fastify.register(cors, {
  origin: corsUrls,
});

// Health test
fastify.get("/health", async () => {
  return { status: "ok" };
});

fastify.register(participantRoutes, { prefix: "/api" });
fastify.register(adminRoutes, { prefix: "/api" });

const start = async () => {
  try {
    await fastify.listen({ port: Number(CONFIG.PORT), host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
