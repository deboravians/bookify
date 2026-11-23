import { createHash, timingSafeEqual } from "node:crypto";
import jwt from "jsonwebtoken";
import { config } from "../config";

function matches(value: string, expected: string): boolean {
  return timingSafeEqual(createHash("sha256").update(value).digest(), createHash("sha256").update(expected).digest());
}

export function authenticateAdmin(username: string, password: string): boolean {
  const userMatches = matches(username, config.adminUsername);
  const passwordMatches = matches(password, config.adminPassword);
  return userMatches && passwordMatches;
}

export function generateAdminToken(): string {
  return jwt.sign({}, config.jwtSecret, { algorithm: "HS256", subject: "admin", expiresIn: config.jwtExpiresIn });
}

export function validateAdminToken(token: string): void {
  const payload = jwt.verify(token, config.jwtSecret, { algorithms: ["HS256"] });
  if (typeof payload === "string" || payload.sub !== "admin" || typeof payload.exp !== "number") {
    throw new Error("Invalid admin token.");
  }
}