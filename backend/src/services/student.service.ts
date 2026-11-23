import { findAllStudents, insertStudent, updateStudentStatus } from "../repositories/student.repository";
import { validateCreateStudent, validateStudentStatus } from "../validators/student.validator";
import { AppError } from "../errors/app.error";

export async function listStudents(search?: unknown) {
  if (search !== undefined && typeof search !== "string") {
    throw new AppError(400, "O parâmetro search deve ser uma string.");
  }

  return findAllStudents(search?.trim());
}

export async function registerStudent(input: unknown) {
  const data = validateCreateStudent(input);

  return insertStudent({ ...data, status: "ATIVO" });
}

export async function changeStudentStatus(id: string, input: unknown) {
  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    throw new AppError(400, "ID do aluno inválido.");
  }

  const status = validateStudentStatus(input);
  const student = await updateStudentStatus(id, status);
  if (!student) {
    throw new AppError(404, "Aluno não encontrado.");
  }
  return student;
}
