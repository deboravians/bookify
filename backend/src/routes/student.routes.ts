import { Router } from "express";
import { createStudent } from "../controllers/student.controller";

export const studentRoutes = Router();

studentRoutes.post("/", createStudent);
