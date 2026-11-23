import "dotenv/config";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value?.trim()) throw new Error(`${name} must be configured.`);
  return value;
}

const jwtSecret = requiredEnv("JWT_SECRET");
if (Buffer.byteLength(jwtSecret, "utf8") < 32) {
  throw new Error("JWT_SECRET must contain at least 32 bytes.");
}
const jwtExpiresIn = Number(requiredEnv("JWT_EXPIRES_IN"));
if (!Number.isSafeInteger(jwtExpiresIn) || jwtExpiresIn <= 0) {
  throw new Error("JWT_EXPIRES_IN must be a positive integer in seconds.");
}

const port = Number(process.env.PORT ?? 5000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535.");
}

export const config = {
  adminUsername: requiredEnv("ADMIN_USERNAME"),
  adminPassword: requiredEnv("ADMIN_PASSWORD"),
  jwtSecret,
  jwtExpiresIn,
  port,
  clientOrigin: process.env.CLIENT ?? "http://localhost:5173",
  mongodbUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/bookify",
};
