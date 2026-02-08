import cors from '@fastify/cors';
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: 'http://localhost:5173', // Vite dev server
});

// Health check
fastify.get('/health', async () => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();