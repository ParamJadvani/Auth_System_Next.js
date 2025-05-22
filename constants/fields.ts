import { ICreateEmployeeValues, IUpdateEmployeeValues } from "@/types/employees";
import { FieldConfig } from "@/types/shared";

const commonFields = {
    basic: [
        {
            id: "firstname",
            label: "First Name",
            type: "text",
            placeholder: "Enter first name",
        },
        {
            id: "middlename",
            label: "Middle Name",
            type: "text",
            placeholder: "Enter middle name",
        },
        {
            id: "lastname",
            label: "Last Name",
            type: "text",
            placeholder: "Enter last name",
        },
        {
            id: "employee_id",
            label: "Employee ID",
            type: "text",
            placeholder: "Enter employee ID",
        },
        { id: "email", label: "Email", type: "email", placeholder: "Enter email" },
        {
            id: "nationality",
            label: "Nationality",
            type: "text",
            placeholder: "Enter nationality",
        },
        {
            id: "designation",
            label: "Designation",
            type: "text",
            placeholder: "Enter designation",
        },
    ],
    date: [
        {
            id: "date_of_birth",
            label: "Date of Birth",
            type: "date",
            placeholder: "Select date",
        },
        {
            id: "date_of_joining",
            label: "Date of Joining",
            type: "date",
            placeholder: "Select date",
        },
        {
            id: "last_working_date",
            label: "Last Working Date",
            type: "date",
            placeholder: "Select date",
        },
        {
            id: "probation_end_date",
            label: "Probation End Date",
            type: "date",
            placeholder: "Select date",
        },
        {
            id: "salary_increment_date",
            label: "Salary Increment Date",
            type: "date",
            placeholder: "Select date",
        },
    ],
    contact: [
        {
            id: "residential",
            label: "Residential Address",
            type: "text",
            placeholder: "Enter address",
        },
        { id: "city", label: "City", type: "text", placeholder: "Enter city" },
        { id: "state", label: "State", type: "text", placeholder: "Enter state" },
        {
            id: "country",
            label: "Country",
            type: "text",
            placeholder: "Enter country",
        },
        {
            id: "pincode",
            label: "Pincode",
            type: "number",
            placeholder: "Enter pincode",
        },
        {
            id: "personal",
            label: "Personal Contact",
            type: "number",
            placeholder: "Enter contact number",
        },
        {
            id: "home",
            label: "Home Contact",
            type: "number",
            placeholder: "Enter contact number",
        },
    ],
    bank: [
        {
            id: "bank_name",
            label: "Bank Name",
            type: "text",
            placeholder: "Enter bank name",
        },
        {
            id: "account_holder_name",
            label: "Account Holder Name",
            type: "text",
            placeholder: "Enter account holder name",
        },
        {
            id: "account_no",
            label: "Account Number",
            type: "number",
            placeholder: "Enter account number",
        },
        {
            id: "branch_name",
            label: "Branch Name",
            type: "text",
            placeholder: "Enter branch name",
        },
        {
            id: "ifsc_code",
            label: "IFSC Code",
            type: "text",
            placeholder: "Enter IFSC code",
        },
    ],
    document: [
        {
            id: "aadhar_card",
            label: "Aadhar Card Number",
            type: "text",
            placeholder: "Enter Aadhar number",
        },
        {
            id: "pan_card",
            label: "PAN Card Number",
            type: "text",
            placeholder: "Enter PAN number",
        },
    ],
    education: [
        {
            id: "degree",
            label: "Degree",
            type: "text",
            placeholder: "Enter degree",
        },
        {
            id: "college_name",
            label: "College/University",
            type: "text",
            placeholder: "Enter college/university",
        },
        {
            id: "designation",
            label: "Designation",
            type: "text",
            placeholder: "Enter designation",
        },
        {
            id: "start_month_year",
            label: "Start Month/Year",
            type: "month",
            placeholder: "Select month/year",
        },
        {
            id: "end_month_year",
            label: "End Month/Year",
            type: "month",
            placeholder: "Select month/year",
        },
    ],
    pf: [
        {
            id: "pf_account_no",
            label: "PF Account Number",
            type: "text",
            placeholder: "Enter PF account number",
        },
        {
            id: "uan_no",
            label: "UAN Number",
            type: "text",
            placeholder: "Enter UAN number",
        },
        {
            id: "esi_no",
            label: "ESI Number",
            type: "text",
            placeholder: "Enter ESI number",
        },
    ],
};
const createFields = <T>(field: keyof typeof commonFields): FieldConfig<T>[] =>
    commonFields[field].map((f) => ({
        id: f.id as keyof T,
        label: f.label,
        type: f.type,
        placeholder: f.placeholder,
    }));

const employeeFields = {
    basic: createFields<ICreateEmployeeValues | IUpdateEmployeeValues>("basic"),
    date: createFields<ICreateEmployeeValues | IUpdateEmployeeValues>("date"),
    contact: createFields<IUpdateEmployeeValues>("contact"),
    bank: createFields<IUpdateEmployeeValues>("bank"),
    document: createFields<IUpdateEmployeeValues>("document"),
    education: createFields<IUpdateEmployeeValues>("education"),
    pf: createFields<IUpdateEmployeeValues>("pf"),
};

export { employeeFields };
