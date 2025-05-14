// lib/validation/user.ts
import { z } from "zod";

export const emailField = z.string().email("Invalid email address");
export const passwordField = z.string();

export const resetPasswordSchema = z
    .object({
        password: passwordField,
        password_confirmation: passwordField,
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    });

export const loginSchema = z.object({
    email: emailField,
    password: passwordField,
});

export const registerSchema = z
    .object({
        firstname: z.string(),
        lastname: z.string(),
        email: emailField,
        password: passwordField,
        password_confirmation: passwordField,
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    });

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
