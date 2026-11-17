import type { RequestHandler } from "express";
import { registerStudent } from "../services/student.service";

export const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const student = await registerStudent(req.body);
    res.status(201).json({ message: "Aluno cadastrado com sucesso.", student });
  } catch (error: unknown) {
    next(error);
  }
};
