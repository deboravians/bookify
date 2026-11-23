import type { RequestHandler } from "express";
import { listStudents, registerStudent } from "../services/student.service";

export const getStudents: RequestHandler = async (req, res, next) => {
  try {
    const students = await listStudents(req.query.search);
    res.status(200).json(students);
  } catch (error: unknown) {
    next(error);
  }
};

export const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const student = await registerStudent(req.body);
    res.status(201).json({ message: "Aluno cadastrado com sucesso.", student });
  } catch (error: unknown) {
    next(error);
  }
};
