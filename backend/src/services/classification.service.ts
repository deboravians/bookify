import { findAllClassifications, insertClassification } from "../repositories/classification.repository";
import { validateCreateClassification } from "../validators/classification.validator";
import { AppError } from "../errors/app.error";

export async function listClassifications(search?: unknown) {
  if (search !== undefined && typeof search !== "string") {
    throw new AppError(400, "O parâmetro search deve ser uma string.");
  }

  return findAllClassifications(search?.trim());
}

export async function registerClassification(input: unknown) {
  const data = validateCreateClassification(input);
  return insertClassification(data);
}
