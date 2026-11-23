import { AppError } from "../errors/app.error";

export interface CreateClassificationInput {
  title: string;
  code: string;
}

export function validateCreateClassification(input: unknown): CreateClassificationInput {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new AppError(400, "Informe o título e o código da classificação.");
  }

  const { title, code } = input as Record<string, unknown>;
  if (typeof title !== "string" || !title.trim() ||
      typeof code !== "string" || !code.trim()) {
    throw new AppError(400, "Título e código devem ser strings não vazias.");
  }

  return { title: title.trim(), code: code.trim() };
}
