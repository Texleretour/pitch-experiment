import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import Fastify from "fastify";
import { participantRoutes } from "./routes/participantRoutes.js";

dotenv.config();

const fastify = Fastify({ logger: true });

const devCorsUrls = [
  "http://localhost:5173", // Vite dev
  "http://localhost:4173", // Vite preview (build)
];

const FRONTEND_SERVER_URL = process.env.CORS_ORIGIN as string;

const corsUrls = [...devCorsUrls, FRONTEND_SERVER_URL];

await fastify.register(cors, {
  origin: corsUrls,
});

fastify.register(participantRoutes, { prefix: "/api" });

// Health test
fastify.get("/health", async () => {
  return { status: "ok" };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server listening on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
