// lib/validations/company.ts
import { z } from "zod";

const fileSizeLimit = 2 * 1024 * 1024; // 2MB

export const companySchema = z.object({
    company_name: z.string().min(2, "Company name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    contact_no: z.string().min(10, "Contact number must be at least 10 digits"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
    pincode: z.string().min(6, "Pincode must be at least 6 digits"),
    address: z.string().min(2, "Address must be at least 2 characters"),
    logo: z.preprocess(
        (val) => {
            if (val instanceof FileList) {
                return val.item(0);
            }
            return val;
        },
        z
            .instanceof(File, { message: "Image is required" })
            .refine((file) => file.size > 0, "Image is required")
            .refine((file) => file.size <= fileSizeLimit, "Max image size is 2 MB")
            .refine(
                (file) => ["image/jpeg", "image/png"].includes(file.type),
                "Invalid file type. Allowed types: JPG, PNG."
            )
    ),
});

export type CompanyDataValues = z.infer<typeof companySchema>;
