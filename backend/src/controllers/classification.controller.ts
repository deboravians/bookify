import type { RequestHandler } from "express";
import { listClassifications, registerClassification } from "../services/classification.service";

export const getClassifications: RequestHandler = async (req, res, next) => {
  try {
    const classifications = await listClassifications(req.query.search);
    res.status(200).json(classifications);
  } catch (error: unknown) {
    next(error);
  }
};

export const createClassification: RequestHandler = async (req, res, next) => {
  try {
    const classification = await registerClassification(req.body);
    res.status(201).json({ classification });
  } catch (error: unknown) {
    next(error);
  }
};
