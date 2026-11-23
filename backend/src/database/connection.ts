import mongoose from "mongoose";
import { config } from "../config";
import { migrateStudentStatuses } from "../repositories/student.repository";
import { Classification } from "../models/classification.model";

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(config.mongodbUri, {
    serverSelectionTimeoutMS: 5000,
  });
  await migrateStudentStatuses();
  await Classification.init();
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
