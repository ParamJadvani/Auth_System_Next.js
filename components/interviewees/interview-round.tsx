import { InterviewRoundForm } from '@/components/interviewees/interview-round-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableNotFound } from '@/components/ui/table/table-notFound';
import useInterviewees from '@/hooks/use-Interviewees';
import { useQueryParams } from '@/hooks/use-query-params';
import { formateDate } from '@/lib/utils';
import { ShortEmployee } from '@/types/employees';
import { createInterviewRoundDetail, InterviewRoundApiResponse, InterviewRoundDetail } from '@/types/interview-rounds';
import { PencilIcon, Trash } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export function InterviewRound({
    interview_id,
    InterviewerName,
}: {
    interview_id: string;
    InterviewerName: ShortEmployee[];
}) {
    const form = useForm<createInterviewRoundDetail>({
        defaultValues: {
            interview_id: interview_id,
            type: "offline",
            round_no: "1",
            mode: "question-ans",
            status: "pending",
        },
    });

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [data, setData] = useState<InterviewRoundApiResponse | undefined>(undefined);
    const [currentRoundId, setCurrentRoundId] = useState<number | null>(null);

    const { addInterviewRounds, deleteInterviewRound, updateInterviewRound, getInterviewRounds } = useInterviewees();
    const { getAllParams, applyFilters } = useQueryParams();

    const fetchData = useCallback(async () => {
        const interviewRoundData = await getInterviewRounds(Number(interview_id));
        setData(interviewRoundData);
    }, [getInterviewRounds, interview_id]);

    const handleAddSubmit = async (data: createInterviewRoundDetail) => {
        if (await addInterviewRounds(Number(interview_id), data)) {
            fetchData();
            setOpen(false);
        }
    };

    const handleEditSubmit = async (data: createInterviewRoundDetail) => {
        if (currentRoundId !== null && await updateInterviewRound(currentRoundId, data)) {
            fetchData();
            setEditOpen(false);
        }
    };

    const handleEditOpen = (round: InterviewRoundDetail) => {
        setCurrentRoundId(round.id);
        form.reset({
            ...round,
            round_no: round.no.toString(),
        });
        setEditOpen(true);
    };

    const handleDelete = async (id: number) => {
        await deleteInterviewRound(id)
        await fetchData();

    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1>Round Detail</h1>
                {data?.data.length !== 4 && (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setOpen(true)}>Add Round</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="border-b">Add new round</DialogTitle>
                                <InterviewRoundForm form={form} onSubmit={handleAddSubmit} InterviewerName={InterviewerName} isEdit={false} />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {["Round no", "Type", "Mode", "Start date", "End date", "Note", "Status", "Action"].map((value) => (
                            <TableHead key={value}>{value}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                {!data?.data || data.data.length === 0 ?
                    <TableNotFound colSpan={8} />
                    : <TableBody>
                        {data?.data.map((value) => (
                            <TableRow key={value.id}>
                                <TableCell>{value.no}</TableCell>
                                <TableCell>{value.type}</TableCell>
                                <TableCell>{value.mode}</TableCell>
                                <TableCell>{formateDate(value.start_time)}</TableCell>
                                <TableCell>{formateDate(value.end_time)}</TableCell>
                                <TableCell>{value.interviewer_note || "-"}</TableCell>
                                <TableCell>{value.status}</TableCell>
                                <TableCell className="space-x-4">
                                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                        <DialogTrigger onClick={() => handleEditOpen(value)}>
                                            <PencilIcon className="w-4 h-4" />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="border-b">Edit round</DialogTitle>
                                                <InterviewRoundForm
                                                    form={form}
                                                    onSubmit={handleEditSubmit}
                                                    InterviewerName={InterviewerName} isEdit={true} />
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Trash className="w-4 h-4 text-red-600" />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline" type="button">Cancel</Button>
                                                </DialogClose>
                                                <Button onClick={() => handleDelete(value.id)} className="bg-red-500 hover:bg-red-600 text-white">
                                                    Yes, Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                }

            </Table>

            <Pagination
                data={data?.meta}
                currentPage={Number(getAllParams().page) || 1}
                onPageChange={(newPage) => applyFilters({ page: newPage.toString() })}
                onLimitChange={(limit) => applyFilters({ limit, page: "1" })}
            />
        </div>
    );
}