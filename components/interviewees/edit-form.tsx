import { InterviewRoundApiResponse } from '@/types/interview-rounds';
import { IntervieweeApiResponse } from '@/types/interviewees';

export function EditFormPage({ InterviewData, InterviewRoundData, InterviewerName }: { InterviewData: IntervieweeApiResponse, InterviewRoundData: InterviewRoundApiResponse, InterviewerName: any }) {

    console.log(InterviewData, InterviewRoundData, InterviewerName);

    return (
        <div>
            Edit Page
        </div>
    )
}