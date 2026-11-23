import { Router } from "express";
import { createClassification, getClassifications, putClassification } from "../controllers/classification.controller";

export const classificationRoutes = Router();

classificationRoutes.post("/", createClassification);
classificationRoutes.get("/", getClassifications);
classificationRoutes.put("/:id", putClassification);
