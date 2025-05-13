export interface CreateAdmin {
    firstname: string;
    lastname: string;
    middlename: string;
    email: string;
    password: string;
    date_of_birth: string;
    gender: "male" | "female" | "other";
    nationality: string;
    marital_status: "unmarried" | "engage" | "married";
    blood_group: "a+" | "a-" | "b+" | "b-" | "ab+" | "ab-" | "o+" | "o-";
    date_of_joining: string;
    probation_end_date: string;
    status: "active" | "inactive";
    pf_contribution: number;
    abry_contribution: number;
    esi_contribution: number;
    last_working_date: string;
}
