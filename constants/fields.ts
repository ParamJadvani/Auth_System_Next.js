import { ICreateAdminValues, IUpdateAdminValues } from "@/types/admin";
import { ICreateEmployeeValues, IUpdateEmployeeValues } from "@/types/employees";
import { FieldConfig } from "@/types/shared";
import { LucideIcon } from "lucide-react";
import { CalendarIcon, GlobeIcon, MapPinIcon, MailIcon, UserIcon, PhoneIcon } from "lucide-react";

function createFieldConfig<T>(
    id: keyof T,
    label: string,
    icon: LucideIcon,
    type: string,
    placeholder: string
): FieldConfig<T> {
    return { id, label, icon, type, placeholder };
}

const basicFieldsEmployee: FieldConfig<ICreateEmployeeValues | IUpdateEmployeeValues>[] = [
    createFieldConfig("firstname", "First Name", UserIcon, "text", "Enter first name"),
    createFieldConfig("middlename", "Middle Name", UserIcon, "text", "Enter middle name"),
    createFieldConfig("lastname", "Last Name", UserIcon, "text", "Enter last name"),
    createFieldConfig("employee_id", "Employee ID", UserIcon, "text", "Enter employee ID"),
    createFieldConfig("nationality", "Nationality", GlobeIcon, "text", "Enter nationality"),
    createFieldConfig("email", "Email", MailIcon, "email", "Enter email"),
];

const dateFieldsEmployee: FieldConfig<ICreateEmployeeValues | IUpdateEmployeeValues>[] = [
    createFieldConfig("date_of_birth", "Date of Birth", CalendarIcon, "date", "Select date"),
    createFieldConfig("date_of_joining", "Date of Joining", CalendarIcon, "date", "Select date"),
    createFieldConfig(
        "probation_end_date",
        "Probation End Date",
        CalendarIcon,
        "date",
        "Select date"
    ),
    createFieldConfig(
        "salary_increment_date",
        "Salary Increment Date",
        CalendarIcon,
        "date",
        "Select date"
    ),
    createFieldConfig(
        "next_increment_date",
        "Next Increment Date",
        CalendarIcon,
        "date",
        "Select date"
    ),
    createFieldConfig(
        "last_working_date",
        "Last Working Date",
        CalendarIcon,
        "date",
        "Select date"
    ),
];

const contactFieldsEmployee: FieldConfig<IUpdateEmployeeValues>[] = [
    createFieldConfig("residential", "Residential Address", MapPinIcon, "text", "Enter address"),
    createFieldConfig("city", "City", GlobeIcon, "text", "Enter city"),
    createFieldConfig("state", "State", MapPinIcon, "text", "Enter state"),
    createFieldConfig("country", "Country", GlobeIcon, "text", "Enter country"),
    createFieldConfig("pincode", "Pincode", MapPinIcon, "number", "Enter pincode"),
    createFieldConfig("personal", "Personal Contact", PhoneIcon, "number", "Enter contact number"),
    createFieldConfig("home", "Home Contact", PhoneIcon, "number", "Enter contact number"),
];

const bankFieldsEmployee: FieldConfig<IUpdateEmployeeValues>[] = [
    createFieldConfig("bank_name", "Bank Name", GlobeIcon, "text", "Enter bank name"),
    createFieldConfig(
        "account_holder_name",
        "Account Holder Name",
        UserIcon,
        "text",
        "Enter account holder name"
    ),
    createFieldConfig("account_no", "Account Number", GlobeIcon, "number", "Enter account number"),
    createFieldConfig("branch_name", "Branch Name", MapPinIcon, "text", "Enter branch name"),
    createFieldConfig("ifsc_code", "IFSC Code", GlobeIcon, "text", "Enter IFSC code"),
];

const documentFieldsEmployee: FieldConfig<IUpdateEmployeeValues>[] = [
    createFieldConfig(
        "aadhar_card",
        "Aadhar Card Number",
        GlobeIcon,
        "text",
        "Enter Aadhar number"
    ),
    createFieldConfig("pan_card", "PAN Card Number", UserIcon, "text", "Enter PAN number"),
];

const educationFieldsEmployee: FieldConfig<IUpdateEmployeeValues>[] = [
    createFieldConfig("degree", "Degree", GlobeIcon, "text", "Enter degree"),
    createFieldConfig(
        "college_name",
        "College/University",
        GlobeIcon,
        "text",
        "Enter college/university"
    ),
    createFieldConfig("designation", "Designation", UserIcon, "text", "Enter designation"),
    createFieldConfig(
        "start_month_year",
        "Start Month/Year",
        CalendarIcon,
        "month",
        "Select month/year"
    ),
    createFieldConfig(
        "end_month_year",
        "End Month/Year",
        CalendarIcon,
        "month",
        "Select month/year"
    ),
];

const pfFieldsEmployee: FieldConfig<IUpdateEmployeeValues>[] = [
    createFieldConfig(
        "pf_account_no",
        "PF Account Number",
        GlobeIcon,
        "text",
        "Enter PF account number"
    ),
    createFieldConfig("uan_no", "UAN Number", GlobeIcon, "text", "Enter UAN number"),
    createFieldConfig("esi_no", "ESI Number", GlobeIcon, "text", "Enter ESI number"),
];

const basicFieldsAdmin: FieldConfig<ICreateAdminValues | IUpdateAdminValues>[] = [
    createFieldConfig("firstname", "First Name", UserIcon, "text", "Enter first name"),
    createFieldConfig("lastname", "Last Name", UserIcon, "text", "Enter last name"),
    createFieldConfig("email", "Email", MailIcon, "email", "Enter email"),
];

const dateFieldsAdmin: FieldConfig<ICreateAdminValues | IUpdateAdminValues>[] = [
    createFieldConfig("date_of_birth", "Date of Birth", CalendarIcon, "date", "Select date"),
    createFieldConfig("date_of_joining", "Date of Joining", CalendarIcon, "date", "Select date"),
];

const contactFieldsAdmin: FieldConfig<IUpdateAdminValues>[] = [
    createFieldConfig("residential", "Residential Address", MapPinIcon, "text", "Enter address"),
    createFieldConfig("city", "City", GlobeIcon, "text", "Enter city"),
];

const bankFieldsAdmin: FieldConfig<IUpdateAdminValues>[] = [
    createFieldConfig("bank_name", "Bank Name", GlobeIcon, "text", "Enter bank name"),
    createFieldConfig(
        "account_holder_name",
        "Account Holder Name",
        UserIcon,
        "text",
        "Enter account holder name"
    ),
];

const documentFieldsAdmin: FieldConfig<IUpdateAdminValues>[] = [
    createFieldConfig(
        "aadhar_card",
        "Aadhar Card Number",
        GlobeIcon,
        "text",
        "Enter Aadhar number"
    ),
    createFieldConfig("pan_card", "PAN Card Number", UserIcon, "text", "Enter PAN number"),
];

const educationFieldsAdmin: FieldConfig<IUpdateAdminValues>[] = [
    createFieldConfig("degree", "Degree", GlobeIcon, "text", "Enter degree"),
    createFieldConfig(
        "college_name",
        "College/University",
        GlobeIcon,
        "text",
        "Enter college/university"
    ),
    createFieldConfig("designation", "Designation", UserIcon, "text", "Enter designation"),
    createFieldConfig(
        "start_month_year",
        "Start Month/Year",
        CalendarIcon,
        "month",
        "Select month/year"
    ),
    createFieldConfig(
        "end_month_year",
        "End Month/Year",
        CalendarIcon,
        "month",
        "Select month/year"
    ),
];

const pfFieldsAdmin: FieldConfig<IUpdateAdminValues>[] = [
    createFieldConfig(
        "pf_account_no",
        "PF Account Number",
        GlobeIcon,
        "text",
        "Enter PF account number"
    ),
    createFieldConfig("uan_no", "UAN Number", GlobeIcon, "text", "Enter UAN number"),
    createFieldConfig("esi_no", "ESI Number", GlobeIcon, "text", "Enter ESI number"),
];

const employeeFields = {
    basic: basicFieldsEmployee,
    date: dateFieldsEmployee,
    contact: contactFieldsEmployee,
    bank: bankFieldsEmployee,
    document: documentFieldsEmployee,
    education: educationFieldsEmployee,
    pf: pfFieldsEmployee,
};

const adminFields = {
    basic: basicFieldsAdmin,
    date: dateFieldsAdmin,
    contact: contactFieldsAdmin,
    bank: bankFieldsAdmin,
    document: documentFieldsAdmin,
    education: educationFieldsAdmin,
    pf: pfFieldsAdmin,
};

export { employeeFields, adminFields };
