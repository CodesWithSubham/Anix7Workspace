import { object, string, boolean, number } from "zod";

export const signInSchema = object({
  email: string()
    .email("Invalid email address.")
    .transform((email) => email.toLowerCase().replace(/\+.*(?=@)/, "")),
  password: string().min(1, "Password is required").max(32, "Entered password is too long"),
});

// Zod schema for signup validation
export const signupSchema = object({
  firstName: string()
    .min(1, "First name is required.")
    .max(48, "First name must be less than 48 characters."),
  lastName: string().max(48, "Last name must be less than 48 characters.").optional(), // Optional field
  email: string()
    .email("Invalid email address.")
    .transform((email) => email.toLowerCase().replace(/\+.*(?=@)/, "")), // Sanitize email
  password: string()
    .min(1, "Please enter a password.")
    .min(8, "Password must be at least 8 characters long.")
    .max(32, "Password must be less than 32 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/\d/, "Password must contain at least one number.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character."),
  confirmPassword: string(),
  isVerified: boolean().optional().default(false), // Optional field
  profilePic: string().url("Invalid URL.").optional().nullable(), // Optional field
  balance: number().optional().default(0), // Optional field, defaults to 0
  referredBy: string().optional().nullable(), // Optional field, can be null
}).refine((data) => data.password === data.confirmPassword, {
  error: "Passwords do not match.",
  path: ["confirmPassword"], // Point the error to confirmPassword
});
