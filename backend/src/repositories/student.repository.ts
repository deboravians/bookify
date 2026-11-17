import { Error as MongooseError, type InferSchemaType } from "mongoose";
import { AppError } from "../errors/app.error";
import { Student } from "../models/student.model";

type StudentData = InferSchemaType<typeof Student.schema>;

export async function findAllStudents() {
  return Student.find({ }).select("_id registration name phone address status").lean().exec();
}

export async function insertStudent(data: StudentData) {
  try {
    // Garante o índice único inclusive no primeiro cadastro.
    await Student.init();
    return await Student.create(data);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
      throw new AppError(409, "Matrícula já cadastrada.");
    }

    if (error instanceof MongooseError.ValidationError || error instanceof MongooseError.CastError) {
      throw new AppError(400, "Dados do aluno inválidos.");
    }

    throw error;
  }
}
