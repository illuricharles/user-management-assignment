import { z } from "zod";
import { GENDER_VALUES, STATUS_VALUES } from "../constants/userConstants.js";

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),

  gender: z
    .enum(GENDER_VALUES)
    .or(z.literal(""))
    .refine((val) => val !== "", "Please select a gender"),

  status: z
    .enum(STATUS_VALUES)
    .or(z.literal(""))
    .refine((val) => val !== "", "Please select a status"),

  location: z.string().min(1, "Location is required"),
  profile: z.any().nullable(),
});

export type UserSchemaTypes = z.infer<typeof userSchema>;
