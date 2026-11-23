import { Error as MongooseError, type InferSchemaType } from "mongoose";
import { AppError } from "../errors/app.error";
import { Teacher, type TeacherStatus } from "../models/teacher.model";

type TeacherData = InferSchemaType<typeof Teacher.schema>;

const fields = "_id cpf name phone address status";

function handleWriteError(error: unknown): never {
  if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
    throw new AppError(409, "CPF já cadastrado.");
  }

  if (error instanceof MongooseError.ValidationError || error instanceof MongooseError.CastError) {
    throw new AppError(400, "Dados do professor inválidos.");
  }

  throw error;
}

export async function findAllTeachers(search?: string) {
  const pattern = search ? new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") : undefined;
  const filter = pattern ? { $or: [{ name: pattern }, { cpf: pattern }] } : {};

  return Teacher.find(filter).select(fields).lean().exec();
}

export async function findTeacherById(id: string) {
  return Teacher.findById(id).select(fields).lean().exec();
}

export async function insertTeacher(data: TeacherData) {
  try {
    await Teacher.init();
    return await Teacher.create(data);
  } catch (error: unknown) {
    handleWriteError(error);
  }
}

export async function updateTeacher(id: string, data: Omit<TeacherData, "status">) {
  try {
    await Teacher.init();
    return await Teacher.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .select(fields).lean().exec();
  } catch (error: unknown) {
    handleWriteError(error);
  }
}

export async function updateTeacherStatus(id: string, status: TeacherStatus) {
  return Teacher.findByIdAndUpdate(id, { $set: { status } }, { new: true, runValidators: true })
    .select(fields).lean().exec();
}
