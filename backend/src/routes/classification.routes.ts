import { Router } from "express";
import { createClassification, getClassifications } from "../controllers/classification.controller";

export const classificationRoutes = Router();

classificationRoutes.post("/", createClassification);
classificationRoutes.get("/", getClassifications);
