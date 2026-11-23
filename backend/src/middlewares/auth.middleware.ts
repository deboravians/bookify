import type { RequestHandler } from "express";
import { validateAdminToken } from "../services/auth.service";

export const requireAdmin: RequestHandler = (req, res, next) => {
  const match = /^Bearer ([^\s]+)$/i.exec(req.headers.authorization ?? "");
  try {
    if (!match) throw new Error("Missing bearer token.");
    validateAdminToken(match[1]);
  } catch {
    res.setHeader("WWW-Authenticate", "Bearer");
    res.status(401).json({ message: "Token ausente, inválido ou expirado." });
    return;
  }
  next();
};