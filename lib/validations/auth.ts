// lib/validation/user.ts
import { z } from "zod";

export const emailField = z.string().email("Invalid email address");
export const passwordField = z.string();

export const resetPasswordSchema = z
    .object({
        password: passwordField
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            ),
        password_confirmation: passwordField.min(
            7,
            "Confirm password must be at least 7 characters"
        ),
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
        firstname: z.string().min(2, "First name must be at least 2 characters"),
        lastname: z.string().min(2, "Last name must be at least 2 characters"),
        email: emailField,
        password: passwordField
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            ),
        password_confirmation: passwordField.min(
            7,
            "Confirm password must be at least 7 characters"
        ),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    });

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
