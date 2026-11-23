import mongoose from "mongoose";
import { config } from "../config";
import { migrateStudentStatuses } from "../repositories/student.repository";

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(config.mongodbUri, {
    serverSelectionTimeoutMS: 5000,
  });
  await migrateStudentStatuses();
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
