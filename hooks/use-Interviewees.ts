import API from "@/lib/axios";
import {
    createInterviewRoundDetail,
    InterviewRoundApiResponse,
    InterviewRoundDetail,
} from "@/types/interview-rounds";
import { CandidateProfile, Interviewee, IntervieweeApiResponse } from "@/types/interviewees";
import { useCallback } from "react";

interface FetchParams {
    filter?: string;
    position?: string;
    interview_date?: string;
    date_of_joining_after?: string;
    page?: number;
    limit?: number;
    status?: string;
    sort_column?: string;
    sort_order?: "asc" | "desc";
    designation?: string;
}

export default function useInterviewees() {
    const add = useCallback(async (data: CandidateProfile) => {
        try {
            await API.post("/interviews", data);
        } catch {}
    }, []);

    const get = useCallback(
        async (params: FetchParams = {}): Promise<IntervieweeApiResponse | undefined> => {
            const {
                filter = "",
                position = "",
                interview_date = "",
                date_of_joining_after = "",
                page = 1,
                limit = 10,
                status = "",
                sort_column = "created_at",
                sort_order = "desc",
                designation = "",
            } = params;

            try {
                const response = await API.get<IntervieweeApiResponse>("/interviews", {
                    params: {
                        filter,
                        position,
                        interview_date,
                        date_of_joining_after,
                        page,
                        limit,
                        status,
                        sort_column,
                        sort_order,
                        designation,
                    },
                });
                return response.data;
            } catch {}
        },
        []
    );

    const deleteInt = async (id: number) => {
        try {
            await API.delete(`/interviews/${id}`);
        } catch {}
    };

    const update = async (id: number, data: FormData) => {
        try {
            await API.post(`/interviews/${id}`, data, {
                headers: {
                    "Content-Type": "multi-part/form-data",
                },
            });
        } catch {}
    };

    const getDetails = useCallback(async (id: number): Promise<Interviewee | undefined> => {
        try {
            const res = await API.get(`/interviews/${id}`);
            return res.data;
        } catch {}
    }, []);

    const getInterviewRounds = useCallback(
        async (interviewId: number): Promise<InterviewRoundApiResponse | undefined> => {
            try {
                const res = await API.get(`/interview-rounds/${interviewId}`);
                return res.data;
            } catch {}
        },
        []
    );

    const addInterviewRounds = async (id: number, data: createInterviewRoundDetail) => {
        try {
            await API.post(`/interview-rounds/${id}`, data);
            return true;
        } catch {
            return false;
        }
    };

    const getInterviewRoundsDetail = async (
        interviewRoundId: number
    ): Promise<InterviewRoundDetail | undefined> => {
        try {
            const res = await API.get(`interview-rounds/show/${interviewRoundId}`);
            return res.data;
        } catch {}
    };

    const updateInterviewRound = async (id: number, data: createInterviewRoundDetail) => {
        try {
            await API.post(`/interview-rounds/update/${id}`, data);
            return true;
        } catch {
            return false;
        }
    };

    const deleteInterviewRound = async (id: number) => {
        try {
            await API.delete(`interview-rounds/${id}`);
        } catch {}
    };

    return {
        add,
        get,
        deleteInt,
        update,
        getDetails,
        getInterviewRounds,
        addInterviewRounds,
        getInterviewRoundsDetail,
        updateInterviewRound,
        deleteInterviewRound,
    };
}
