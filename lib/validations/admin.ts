import { z } from "zod";

const defaultAdminSchema = z.object({
    firstname: z.string(),
    lastname: z.string().nullable(),
    middlename: z.string().nullable(),
    email: z.string(),
    date_of_birth: z.string(),
    gender: z.enum(["male", "female", "other"]),
    nationality: z.string(),
    marital_status: z.enum(["unmarried", "engaged", "married"]),
    blood_group: z.enum(["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-", ""]).nullable(),
    date_of_joining: z.string(),
    probation_end_date: z.string(),
    status: z.enum(["active", "inactive"]),
    pf_contribution: z.number(),
    abry_contribution: z.number(),
    esi_contribution: z.number(),
    last_working_date: z.string().nullable(),
});

export const createAdminSchema = z
    .object({
        password: z.string(),
    })
    .merge(defaultAdminSchema);

export const updateAdminSchema = z
    .object({
        id: z.number(),
        company_id: z.number(),
        email_verified_at: z.string().nullable(),
        contact_no: z.string().nullable(), // Changed from z.record to z.string
        address: z.string().nullable(),
        aadhar_card: z.string().nullable(),
        pan_card: z.string().nullable(),
        pf_account_no: z.string().nullable(),
        uan_no: z.string().nullable(),
        esi_no: z.string().nullable(),
        designation: z.string().nullable(),
        employee_id: z.string().nullable(),
        education_info: z.string().nullable(), // Changed from z.record to z.string
        bank_info: z.string().nullable(), // Changed from z.record to z.string
        salary_contract_period: z.string().nullable(),
        salary_increment_date: z.string().nullable(),
        next_increment_date: z.string().nullable(),
        hold_percentage: z.number().nullable(),
        hold_paid_at: z.string().nullable(),
        file_size_limit: z.number(),
        used_size: z.number(),
        is_admin: z.number(),
        is_super_admin: z.number(),
        two_factor_secret: z.string().nullable(),
        remember_me_token: z.string().nullable(),
        created_at: z.string(),
        updated_at: z.string(),
        deleted_at: z.string().nullable(),
        account_holder_name: z.string().nullable(),
        account_no: z.string().nullable(),
        account_type: z.string().nullable(),
        bank_name: z.string().nullable(),
        branch_name: z.string().nullable(),
        city: z.string().nullable(),
        college_name: z.string().nullable(),
        country: z.string().nullable(),
        degree: z.string().nullable(),
        end_month_year: z.string().nullable(),
        home: z.string().nullable(),
        ifsc_code: z.string().nullable(),
        personal: z.string().nullable(),
        pincode: z.string().nullable(),
        residential: z.string().nullable(),
        start_month_year: z.string().nullable(),
        state: z.string().nullable(),
    })
    .merge(defaultAdminSchema);

export type CreateAdminValues = z.infer<typeof createAdminSchema>;
export type UpdateAdminValues = z.infer<typeof updateAdminSchema>;
