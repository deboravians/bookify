import { AppError } from "../errors/app.error";
import type { StudentStatus } from "../models/student.model";

export function validateStudentStatus(body: unknown): StudentStatus {
  if (!isObject(body) || (body.status !== "ATIVO" && body.status !== "INATIVO")) {
    throw new AppError(400, "O status deve ser ATIVO ou INATIVO.");
  }
  if (Object.keys(body).some((key) => key !== "status")) {
    throw new AppError(400, "Envie apenas o campo status.");
  }
  return body.status;
}

export interface CreateStudentInput {
  registration: string;
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

export function validateCreateStudent(body: unknown): CreateStudentInput {
  if (!isObject(body) || "status" in body) {
    throw new AppError(400, "Envie os dados do aluno sem o campo status.");
  }

  const { registration, name, phone, address } = body;

  if (!isRequiredString(registration) || !isRequiredString(name) ||
      !isRequiredString(phone) || !isObject(address) ||
      !isRequiredString(address.city) || !isRequiredString(address.neighborhood) ||
      !isRequiredString(address.street) || !isRequiredString(address.number) ||
      (address.complement !== undefined && typeof address.complement !== "string")) {
    throw new AppError(400,
      "Matrícula, nome, telefone, cidade, bairro, rua e número devem ser strings não vazias. Complemento é opcional e deve ser uma string.");
  }

  return {
    registration, name, phone,
    address: {
      city: address.city,
      neighborhood: address.neighborhood,
      street: address.street,
      number: address.number,
      complement: address.complement,
    },
  };
}
