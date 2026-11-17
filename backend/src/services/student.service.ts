import { findAllStudents, insertStudent } from "../repositories/student.repository";
import { validateCreateStudent } from "../validators/student.validator";

export async function listStudents() {
  return findAllStudents();
}

export async function registerStudent(input: unknown) {
  const data = validateCreateStudent(input);

  return insertStudent({ ...data, status: true });
}
