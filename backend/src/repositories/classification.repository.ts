import { Classification } from "../models/classification.model";
import type { CreateClassificationInput } from "../validators/classification.validator";
import { AppError } from "../errors/app.error";
import { Types } from "mongoose";

export async function findClassificationById(id: string) {
  return Classification.findById(id).select("_id").lean().exec();
}

export async function hasBooksWithClassification(id: string): Promise<boolean> {
  // O cadastro de livros deverá referenciar a classificação em books.classification.
  // Aceita o ID como ObjectId ou string, sem criar um cadastro de livros aqui.
  const book = await Classification.db.collection("books").findOne(
    { classification: { $in: [new Types.ObjectId(id), id] } },
    { projection: { _id: 1 } },
  );
  return book !== null;
}

export async function deleteClassificationById(id: string) {
  return Classification.findByIdAndDelete(id).select("_id").lean().exec();
}

export async function findAllClassifications(search?: string) {
  // Trata o texto como literal, inclusive quando contém caracteres de regex.
  const pattern = search ? new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") : undefined;
  const filter = pattern ? { $or: [{ title: pattern }, { code: pattern }] } : {};

  return Classification.find(filter).select("_id title code").lean().exec();
}

export async function updateClassification(id: string, data: CreateClassificationInput) {
  try {
    return await Classification.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .select("_id title code").lean().exec();
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000 &&
        "keyPattern" in error && typeof error.keyPattern === "object" &&
        error.keyPattern !== null && "code" in error.keyPattern) {
      throw new AppError(409, "Código de classificação já cadastrado.");
    }
    throw error;
  }
}

export async function insertClassification(data: CreateClassificationInput) {
  try {
    return await Classification.create(data);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000 &&
        "keyPattern" in error && typeof error.keyPattern === "object" &&
        error.keyPattern !== null && "code" in error.keyPattern) {
      throw new AppError(409, "Código de classificação já cadastrado.");
    }
    throw error;
  }
}
