import { Router } from "express";
import { createStudent, getStudents, patchStudentStatus, putStudent } from "../controllers/student.controller";

export const studentRoutes = Router();

studentRoutes.post("/", createStudent);
studentRoutes.get("/", getStudents);
studentRoutes.patch("/:id/status", patchStudentStatus);
studentRoutes.put("/:id", putStudent);
