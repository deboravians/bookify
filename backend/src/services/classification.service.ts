import { findAllClassifications, insertClassification } from "../repositories/classification.repository";
import { validateCreateClassification } from "../validators/classification.validator";

export async function listClassifications() {
  return findAllClassifications();
}

export async function registerClassification(input: unknown) {
  const data = validateCreateClassification(input);
  return insertClassification(data);
}
