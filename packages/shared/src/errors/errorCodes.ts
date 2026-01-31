export const ErrorCode = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
