import {
  deleteClassificationById,
  findAllClassifications,
  findClassificationById,
  hasBooksWithClassification,
  insertClassification,
  updateClassification,
} from "../repositories/classification.repository";
import { validateCreateClassification } from "../validators/classification.validator";
import { AppError } from "../errors/app.error";

export async function removeClassification(id: string): Promise<void> {
  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    throw new AppError(400, "ID da classificação inválido.");
  }

  if (!await findClassificationById(id)) {
    throw new AppError(404, "Classificação não encontrada.");
  }
  if (await hasBooksWithClassification(id)) {
    throw new AppError(409, "Não é possível excluir uma classificação com livros associados.");
  }
  if (!await deleteClassificationById(id)) {
    throw new AppError(404, "Classificação não encontrada.");
  }
}

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

export async function editClassification(id: string, input: unknown) {
  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    throw new AppError(400, "ID da classificação inválido.");
  }

  const data = validateCreateClassification(input);
  const classification = await updateClassification(id, data);
  if (!classification) {
    throw new AppError(404, "Classificação não encontrada.");
  }
  return classification;
}
