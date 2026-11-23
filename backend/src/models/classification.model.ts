import { model, Schema } from "mongoose";

const classificationSchema = new Schema({
  title: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, trim: true },
}, { versionKey: false });

export const Classification = model("Classification", classificationSchema);
