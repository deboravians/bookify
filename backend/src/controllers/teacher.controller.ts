import type { RequestHandler } from "express";
import {
  changeTeacherStatus, editTeacher, getTeacher, listTeachers, registerTeacher,
} from "../services/teacher.service";

export const getTeachers: RequestHandler = async (req, res, next) => {
  try {
    const teachers = await listTeachers(req.query.search);
    res.status(200).json(teachers);
  } catch (error: unknown) {
    next(error);
  }
};

export const getTeacherById: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const teacher = await getTeacher(req.params.id);
    res.status(200).json({ teacher });
  } catch (error: unknown) {
    next(error);
  }
};

export const createTeacher: RequestHandler = async (req, res, next) => {
  try {
    const teacher = await registerTeacher(req.body);
    res.status(201).json({ message: "Professor cadastrado com sucesso.", teacher });
  } catch (error: unknown) {
    next(error);
  }
};

export const putTeacher: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const teacher = await editTeacher(req.params.id, req.body);
    res.status(200).json({ teacher });
  } catch (error: unknown) {
    next(error);
  }
};

export const patchTeacherStatus: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const teacher = await changeTeacherStatus(req.params.id, req.body);
    res.status(200).json({ teacher });
  } catch (error: unknown) {
    next(error);
  }
};
