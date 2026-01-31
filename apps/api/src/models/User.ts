import mongoose, { Schema, Document } from "mongoose";
import { GENDER_VALUES, STATUS_VALUES } from "@repo/shared";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
  status: string;
  location: string;
  profile?: string;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String, required: true },
    gender: { type: String, enum: [...GENDER_VALUES], required: true },
    status: { type: String, enum: [...STATUS_VALUES], required: true },
    location: { type: String, required: true },
    profile: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);