import { Meta } from "@/types/admin";

// A single source of truth for the common fields:
export interface BasicInfo {
    firstname: string;
    lastname: string;
    email: string;
    location: string;
    contact_no: string;
    source_of_profile: string;
    source_of_profile_other: string | null;
    experience_year: string;
    experience_month?: string;
    current_last_company: string;
    current_salary: number;
    expected_salary: number;
    notice_period: number | string;
    date_of_joining: string;
    reason_job_change: string;
    linkedin_link: string;
    resume_file: string | null;
    google_folder_id: string | null;
    hr_remark: string;
    status: number | string;
    round?: InterviewRound;
    resume_url: string;
    designation: string;
}

interface InterviewRound {
    no: number;
    interview_id: number;
}

export interface Interviewee extends BasicInfo {
    id: number;
    company_id: number;
    position: string;
    contact_no2: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    user_id: { id: number }[];
}

export interface CandidateProfile extends Omit<BasicInfo, "resume_file" | "google_folder_id"> {
    resume_file: FileList;
    google_folder_id: string;
    google_file_id: string;
}

export interface IntervieweeApiResponse {
    meta: Meta;
    data: Interviewee[];
}
