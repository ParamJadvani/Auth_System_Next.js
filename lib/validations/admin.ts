// lib/validations/company.ts
import { z } from "zod";

export const createAdminSchema = z.object({
    firstname: z.string().min(2, "First name must be at least 2 characters"),
    lastname: z.string().min(2, "Last name must be at least 2 characters"),
    middlename: z.string().min(2, "Middle name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    date_of_birth: z.string().min(10, "Date of birth must be at least 10 digits"),
    gender: z.enum(["male", "female", "other"]),
    nationality: z.string().min(2, "Nationality must be at least 2 characters"),
    marital_status: z.enum(["unmarried", "engage", "married"]),
    blood_group: z.enum(["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-", ""]),
    date_of_joining: z.string().min(10, "Date of joining must be at least 10 digits"),
    probation_end_date: z.string().min(10, "Probation end date must be at least 10 digits"),
    status: z.enum(["active", "inactive"]),
    pf_contribution: z.number().min(0, "PF contribution must be at least 0"),
    abry_contribution: z.number().min(0, "ABRY contribution must be at least 0"),
    esi_contribution: z.number().min(0, "ESI contribution must be at least 0"),
    last_working_date: z.string().min(10, "Last working date must be at least 10 digits"),
});

export type CreateAdminValues = z.infer<typeof createAdminSchema>;
