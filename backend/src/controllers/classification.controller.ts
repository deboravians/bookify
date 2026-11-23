import type { RequestHandler } from "express";
import { editClassification, listClassifications, registerClassification, removeClassification } from "../services/classification.service";

export const deleteClassification: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    await removeClassification(req.params.id);
    res.status(204).end();
  } catch (error: unknown) {
    next(error);
  }
};

export const putClassification: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const classification = await editClassification(req.params.id, req.body);
    res.status(200).json({ classification });
  } catch (error: unknown) {
    next(error);
  }
};

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
