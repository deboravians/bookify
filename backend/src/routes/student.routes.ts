import { Router } from "express";
import { createStudent, getStudents } from "../controllers/student.controller";

export const studentRoutes = Router();

studentRoutes.post("/", createStudent);
studentRoutes.get("/", getStudents);
