import type { RequestHandler } from "express";
import { registerClassification } from "../services/classification.service";

export const createClassification: RequestHandler = async (req, res, next) => {
  try {
    const classification = await registerClassification(req.body);
    res.status(201).json({ classification });
  } catch (error: unknown) {
    next(error);
  }
};
