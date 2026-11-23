import { Classification } from "../models/classification.model";
import type { CreateClassificationInput } from "../validators/classification.validator";
import { AppError } from "../errors/app.error";

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
