import { Classification } from "../models/classification.model";
import type { CreateClassificationInput } from "../validators/classification.validator";
import { AppError } from "../errors/app.error";

export async function findAllClassifications(search?: string) {
  // Trata o texto como literal, inclusive quando contém caracteres de regex.
  const pattern = search ? new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") : undefined;
  const filter = pattern ? { $or: [{ title: pattern }, { code: pattern }] } : {};

  return Classification.find(filter).select("_id title code").lean().exec();
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
