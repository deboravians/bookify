import type { RequestHandler } from "express";
import { changeStudentStatus, listStudents, registerStudent } from "../services/student.service";

export const patchStudentStatus: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const student = await changeStudentStatus(req.params.id, req.body);
    res.status(200).json({ message: "Status do aluno atualizado com sucesso.", student });
  } catch (error: unknown) {
    next(error);
  }
};

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
