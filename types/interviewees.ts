export interface CandidateProfile {
    contact_no: string | number;
    current_last_company: string;
    current_salary: number | string;
    date_of_joining: string;
    email: string;
    expected_salary: number | string;
    experience_month: number;
    experience_year: number;
    firstname: string;
    lastname: string;
    location: string;
    notice_period: number | string | undefined;
    reason_job_change: string;
    linkedin_link: string;
    source_of_profile: string | undefined;
    source_of_profile_other?: string;
    status: string | undefined;
    hr_remark?: string;
    resume_file: FileList;
    google_folder_id: string;
    google_file_id: string;
    designation: string;
}
