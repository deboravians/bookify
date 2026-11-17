import { model, Schema } from "mongoose";

const addressSchema = new Schema({
  city: { type: String, required: true, trim: true },
  neighborhood: { type: String, required: true, trim: true },
  street: { type: String, required: true, trim: true },
  number: { type: String, required: true, trim: true },
  complement: { type: String, trim: true },
}, { _id: false });

const studentSchema = new Schema({
  registration: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  address: { type: addressSchema, required: true },
  status: { type: Boolean, default: true, required: true },
});

export const Student = model("Student", studentSchema);
