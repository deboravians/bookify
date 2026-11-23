import { Error as MongooseError, type InferSchemaType } from "mongoose";
import { AppError } from "../errors/app.error";
import { Student, type StudentStatus } from "../models/student.model";

type StudentData = InferSchemaType<typeof Student.schema>;

export async function updateStudent(id: string, data: Omit<StudentData, "status">) {
  try {
    await Student.init();
    return await Student.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .select("_id registration name phone address status").lean().exec();
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

export async function migrateStudentStatuses(): Promise<void> {
  // Usa a coleção diretamente para preservar o tipo booleano no filtro legado.
  await Student.collection.updateMany(
    { status: { $type: "bool" } },
    [{ $set: { status: { $cond: ["$status", "ATIVO", "INATIVO"] } } }],
  );
}

export async function updateStudentStatus(id: string, status: StudentStatus) {
  return Student.findByIdAndUpdate(id, { $set: { status } }, { new: true, runValidators: true })
    .select("_id registration name phone address status").lean().exec();
}

export async function findAllStudents(search?: string) {
  // Trata o texto como literal, inclusive quando contém caracteres de regex.
  const pattern = search ? new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") : undefined;
  const filter = pattern ? { $or: [{ name: pattern }, { registration: pattern }] } : {};

  return Student.find(filter).select("_id registration name phone address status").lean().exec();
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
