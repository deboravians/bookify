import { findAllStudents, insertStudent } from "../repositories/student.repository";
import { validateCreateStudent } from "../validators/student.validator";
import { AppError } from "../errors/app.error";

export async function listStudents(search?: unknown) {
  if (search !== undefined && typeof search !== "string") {
    throw new AppError(400, "O parâmetro search deve ser uma string.");
  }

  return findAllStudents(search?.trim());
}

export async function registerStudent(input: unknown) {
  const data = validateCreateStudent(input);

  return insertStudent({ ...data, status: true });
}
