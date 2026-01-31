import type { GENDER_VALUES, STATUS_VALUES } from "../constants/userConstants.js"

export type Gender = typeof GENDER_VALUES[number];
export type Status = typeof STATUS_VALUES[number];

export type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: Gender | "";
  status: Status | "";
  location: string;
  profile: File | null;
};

export const DEFAULT_VALUES: UserFormData = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  gender: "",
  status: "",
  location: "",
  profile: null,
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: Gender;
  status: Status;
  location: string;
  profile: File | null; // UI only
};
