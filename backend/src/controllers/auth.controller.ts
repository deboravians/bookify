import type { RequestHandler } from "express";
import { authenticateAdmin, generateAdminToken } from "../services/auth.service";
import { config } from "../config";

export const login: RequestHandler = (req, res) => {
  const body: unknown = req.body;

  if (typeof body !== "object" || body === null || Array.isArray(body) ||
      !("username" in body) || !("password" in body) ||
      typeof body.username !== "string" || body.username.length === 0 ||
      typeof body.password !== "string" || body.password.length === 0) {
    res.status(400).json({ message: "Username e password são obrigatórios e devem ser strings não vazias." });
    return;
  }

  if (!authenticateAdmin(body.username, body.password)) {
    res.status(401).json({ message: "Usuário ou senha inválidos." });
    return;
  }

  res.status(200).json({
    accessToken: generateAdminToken(),
    tokenType: "Bearer",
    expiresIn: config.jwtExpiresIn,
  });
};
