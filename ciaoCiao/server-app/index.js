import fastify from "fastify";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

server.get("/", async function handler(req, reply) {
  reply.send({ message: "Hello welcom in caiociao menue " });
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await server.listen({ port: PORT });
    console.log(`server is running on  http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();
