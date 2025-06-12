import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CustomInput } from '@/components/ui/custom-input';
import { DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { IntervieweesStatusList } from '@/helper/helper';
import { CandidateProfile } from '@/types/interviewees';
import { Label } from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import useInterviewees from '@/hooks/use-Interviewees';

export function AddInterviewees() {
    const form = useForm<CandidateProfile>();
    const source = form.watch("source_of_profile");
    const dateValue = form.watch("date_of_joining");
    const [dateOpen, setDateOpen] = useState(false);
    const { add } = useInterviewees();

    const onSubmit = async (data: CandidateProfile) => {
        await add(data);
    };

    return (
        <DialogContent className="w-full sm:max-w-[80vw] max-h-[90vh] overflow-y-auto px-4 sm:px-8 py-6">
            <div className="pb-6">
                <DialogTitle className="text-2xl font-semibold text-blue-700">
                    Add New Interview
                </DialogTitle>
                <Separator className="mt-4" />
            </div>

            <Form {...form}>
                <form className="space-y-12" onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data'>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        <CustomInput id="firstname" label="First Name" placeholder="First Name..." {...form.register("firstname")} />
                        <CustomInput id="lastname" label="Last Name" placeholder="Last Name..." {...form.register("lastname")} />
                        <CustomInput id="contact_no" label="Contact No" type='number' placeholder="Contact no..." {...form.register("contact_no")} />

                        <div className="space-y-2">
                            <CustomInput
                                id="source_of_profile"
                                label="Source of Profile"
                                placeholder="Select Source"
                                value={source}
                                onValueChange={(value) => {
                                    const finalValue = value === "none" ? "" : value;
                                    form.setValue("source_of_profile", finalValue);
                                }}
                                options={[
                                    { label: "Select Source", value: "none" },
                                    { label: "WhatsApp", value: "whatsapp" },
                                    { label: "LinkedIn (Kinjal)", value: "linkedin (kinjal)" },
                                    { label: "LinkedIn (Namrata)", value: "linkedin (namrata)" },
                                    { label: "Dharmesh Reference", value: "dharmesh reference" },
                                    { label: "Shailesh Reference", value: "shailesh reference" },
                                    { label: "Employee Reference", value: "employee reference" },
                                    { label: "Hirect", value: "hirect" },
                                    { label: "ASL Website", value: "asl website" },
                                    { label: "Any Other Portal", value: "other" },
                                ]}
                                select
                            />
                            {source === "other" && (
                                <CustomInput
                                    id="source_of_profile_other"
                                    placeholder="Specify other source"
                                    {...form.register("source_of_profile_other")}
                                />
                            )}
                        </div>
                        <CustomInput id="email" label="Email" placeholder="Email address..." {...form.register("email")} />
                        <CustomInput id="designation" label="Designation" placeholder="Designation..." {...form.register("designation")} />
                        <CustomInput id="current_last_company" label="Current/Last Company" placeholder="Last Company..." {...form.register("current_last_company")} />

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Experience (Years / Months)</Label>
                            <div className="flex gap-3">
                                <CustomInput id="experience_year" placeholder="Year(s)..." {...form.register("experience_year")} className='w-28 border' type='number' />
                                <CustomInput id="experience_month" placeholder="Month(s)..." {...form.register("experience_month")} className='w-28' type='number' />
                            </div>
                        </div>

                        <CustomInput id="current_salary" label="Current Salary" placeholder="Current Salary..." {...form.register("current_salary")} type='number' />

                        <CustomInput id="expected_salary" label="Expected Salary" placeholder="Expected salary..." {...form.register("expected_salary")} type='number' />

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Date of Joining
                            </Label>
                            <Popover open={dateOpen} onOpenChange={setDateOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between font-normal"
                                    >
                                        {dateValue
                                            ? format(new Date(dateValue), "PPP")
                                            : "Select date"}
                                        <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={dateValue ? new Date(dateValue) : undefined}
                                        onSelect={(day) => {
                                            if (day) {
                                                const iso = day.toISOString().split("T")[0];
                                                form.setValue("date_of_joining", iso);
                                            }
                                        }}
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <CustomInput
                            id="notice_period"
                            label="Notice Period (in months)"
                            placeholder="Select notice period"
                            value={form.watch("notice_period")?.toString()}
                            onValueChange={(value) => form.setValue("notice_period", value === "none" ? "" : value)}
                            options={[
                                { label: "Select Notice Period", value: "none" },
                                { label: "Immediate", value: "0" },
                                { label: "1", value: "1" },
                                { label: "2", value: "2" },
                                { label: "3", value: "3" },
                                { label: "4", value: "4" },
                                { label: "5", value: "5" },
                                { label: "6", value: "6" },
                            ]}
                            select
                        />

                        <CustomInput id="location" label="Location" placeholder="Location..." {...form.register("location")} />

                        <CustomInput
                            id="status"
                            label="Status"
                            placeholder="Select status"
                            value={form.watch("status")?.toString()}
                            onValueChange={(value) => form.setValue("status", value === "none" ? "" : value)}
                            options={IntervieweesStatusList}
                            select
                        />

                        <CustomInput id="linkedin_link" label="LinkedIn Link" placeholder="LinkedIn URL..." {...form.register("linkedin_link")} />

                        <CustomInput id="reason_job_change" label="Reason for Job Change" placeholder="Reason..." {...form.register("reason_job_change")} textarea />
                        <CustomInput id="hr_remark" label="HR Remark" placeholder="Remarks..." {...form.register("hr_remark")} textarea />
                        <div />
                    </div>
                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Save Interviewee
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    );
}
