import { Meta } from "@/types/admin";

interface Basic {
    interview_id: string;
    interviewer_note: string;
    interviewer_name: string;
    type: string;
    mode: string;
    start_time: string;
    end_time: string;
    status: string;
}

export interface createInterviewRoundDetail extends Basic {
    round_no: string;
}

export interface InterviewRoundDetail extends Basic {
    id: number;
    company_id: number;
    no: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface InterviewRoundApiResponse {
    meta: Meta;
    data: InterviewRoundDetail[];
}
