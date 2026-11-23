import { Router } from "express";
import {
  createTeacher, getTeacherById, getTeachers, patchTeacherStatus, putTeacher,
} from "../controllers/teacher.controller";

export const teacherRoutes = Router();

teacherRoutes.post("/", createTeacher);
teacherRoutes.get("/", getTeachers);
teacherRoutes.get("/:id", getTeacherById);
teacherRoutes.put("/:id", putTeacher);
teacherRoutes.patch("/:id/status", patchTeacherStatus);
