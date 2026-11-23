import { AppError } from "../errors/app.error";
import type { TeacherStatus } from "../models/teacher.model";

export interface CreateTeacherInput {
  cpf: string;
  name: string;
  phone: string;
  address: {
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement?: string;
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isRequiredString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateTeacherId(id: string): void {
  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    throw new AppError(400, "ID do professor inválido.");
  }
}

export function validateTeacherStatus(body: unknown): TeacherStatus {
  if (!isObject(body) || (body.status !== "ATIVO" && body.status !== "INATIVO")) {
    throw new AppError(400, "O status deve ser ATIVO ou INATIVO.");
  }
  if (Object.keys(body).some((key) => key !== "status")) {
    throw new AppError(400, "Envie apenas o campo status.");
  }
  return body.status;
}

export function validateCreateTeacher(body: unknown): CreateTeacherInput {
  if (!isObject(body) || "status" in body) {
    throw new AppError(400, "Envie os dados do professor sem o campo status.");
  }

  const { cpf, name, phone, address } = body;

  if (!isRequiredString(cpf) || !isRequiredString(name) ||
    !isRequiredString(phone) || !isObject(address) ||
    !isRequiredString(address.city) || !isRequiredString(address.neighborhood) ||
    !isRequiredString(address.street) || !isRequiredString(address.number) ||
    (address.complement !== undefined && typeof address.complement !== "string")) {
    throw new AppError(400,
      "CPF, nome, telefone, cidade, bairro, rua e número devem ser strings não vazias. Complemento é opcional e deve ser uma string.");
  }

  const cpfDigits = cpf.replace(/\D/g, "");
  if (cpfDigits.length !== 11) {
    throw new AppError(400, "O CPF deve ter 11 dígitos.");
  }

  return {
    cpf: cpfDigits, name, phone,
    address: {
      city: address.city,
      neighborhood: address.neighborhood,
      street: address.street,
      number: address.number,
      complement: address.complement,
    },
  };
}
