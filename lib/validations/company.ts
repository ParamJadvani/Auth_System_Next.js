// lib/validations/company.ts
import { z } from "zod";

const fileSizeLimit = 2 * 1024 * 1024; // 2MB

export const companySchema = z.object({
    company_name: z.string(),
    email: z.string(),
    contact_no: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pincode: z.string(),
    address: z.string(),
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
