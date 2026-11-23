import {
  findAllTeachers, findTeacherById, insertTeacher, updateTeacher, updateTeacherStatus,
} from "../repositories/teacher.repository";
import { validateCreateTeacher, validateTeacherId, validateTeacherStatus } from "../validators/teacher.validator";
import { AppError } from "../errors/app.error";

export async function listTeachers(search?: unknown) {
  if (search !== undefined && typeof search !== "string") {
    throw new AppError(400, "O parâmetro search deve ser uma string.");
  }

  return findAllTeachers(search?.trim());
}

export async function getTeacher(id: string) {
  validateTeacherId(id);

  const teacher = await findTeacherById(id);
  if (!teacher) {
    throw new AppError(404, "Professor não encontrado.");
  }
  return teacher;
}

export async function registerTeacher(input: unknown) {
  const data = validateCreateTeacher(input);

  return insertTeacher({ ...data, status: "ATIVO" });
}

export async function editTeacher(id: string, input: unknown) {
  validateTeacherId(id);

  const data = validateCreateTeacher(input);
  const teacher = await updateTeacher(id, data);
  if (!teacher) {
    throw new AppError(404, "Professor não encontrado.");
  }
  return teacher;
}

export async function changeTeacherStatus(id: string, input: unknown) {
  validateTeacherId(id);

  const status = validateTeacherStatus(input);
  const teacher = await updateTeacherStatus(id, status);
  if (!teacher) {
    throw new AppError(404, "Professor não encontrado.");
  }
  return teacher;
}
