import { Router } from "express";
import { createClassification } from "../controllers/classification.controller";

export const classificationRoutes = Router();

classificationRoutes.post("/", createClassification);
