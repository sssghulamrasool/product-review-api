const app = require("./app");
const databaseConnection = require("./config/database");
const logger = require("./config/logger");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// DATABASE IS CONNECTION
databaseConnection();
// SERVER

const appServer = app.listen(9090, () => {
  logger.info("listening on port 9090");
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  appServer.close(() => {
    process.exit(1);
  });
});
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  appServer.close(() => {
    console.log("💥 Process terminated!");
  });
});
