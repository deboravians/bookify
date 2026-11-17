import { app } from "./app";
import { config } from "./config";
import { connectDatabase, disconnectDatabase } from "./database/connection";

async function startServer(): Promise<void> {
  await connectDatabase();
  console.log("Connected to Bookify MongoDB.");

  const server = app.listen(config.port, () => {
    console.log(`Bookify API running at http://localhost:${config.port}`);
  });

  server.on("error", (error) => {
    console.error("Failed to start the HTTP server:", error.message);
    void disconnectDatabase().finally(() => process.exit(1));
  });

  let shuttingDown = false;
  const shutdown = () => {
    if (shuttingDown) return;
    shuttingDown = true;

    const timeout = setTimeout(() => process.exit(1), 10000);
    timeout.unref();

    server.close(() => {
      void disconnectDatabase().then(() => {
        clearTimeout(timeout);
      }).catch(() => process.exit(1));
    });
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

void startServer().catch(async () => {
  console.error("Failed to connect to MongoDB. Check MONGODB_URI and database availability.");
  await disconnectDatabase();
  process.exitCode = 1;
});
