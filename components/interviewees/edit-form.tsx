import { ShortEmployee } from "@/types/employees";
import { Interviewee } from "@/types/interviewees";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { CustomInput } from "@/components/ui/custom-input";
import { Label } from "@/components/ui/label";
import { IntervieweesStatusList } from "@/helper/helper";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { InterviewRound } from '@/components/interviewees/interview-round';

export function EditInterviewFormPage({
  InterviewData,
  InterviewerName,
  onSubmit,
}: {
  InterviewData: Interviewee;
  InterviewerName: ShortEmployee[];
  onSubmit: (formdata: Interviewee) => void;
}) {
  const form = useForm<Interviewee>({
    defaultValues: {
      ...InterviewData,
      experience_month: InterviewData.experience_year.split(".")[1] || "0",
      experience_year: InterviewData.experience_year.split(".")[0] || "0",
    },
  });

  const source = form.watch("source_of_profile");
  const dateValue = form.watch("date_of_joining");

  const [selected, setSelected] = useState<{ id: number }[]>(InterviewData.user_id || []);

  const nameMap = useMemo(() => new Map(InterviewerName.map(user => [user.id, user.firstname])), [InterviewerName]);

  const toggleUser = (id: number) => {
    setSelected((prev) => {
      const isSelected = prev.some((item) => item.id === id);
      const newSelected = isSelected
        ? prev.filter((item) => item.id !== id)
        : [...prev, { id }];
      form.setValue("user_id", newSelected);
      return newSelected;
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Basic details</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <CustomInput
                  id="firstname"
                  label="First Name"
                  placeholder="First Name..."
                  {...form.register("firstname")}
                />
                <CustomInput
                  id="lastname"
                  label="Last Name"
                  placeholder="Last Name..."
                  {...form.register("lastname")}
                />
                <CustomInput
                  id="contact_no"
                  label="Contact No"
                  type="number"
                  placeholder="Contact no..."
                  {...form.register("contact_no")}
                />
                <CustomInput
                  id="contact_no2"
                  label="Contact No 2"
                  type="number"
                  placeholder="Contact no2..."
                  {...form.register("contact_no2")}
                />

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
                <CustomInput
                  id="email"
                  label="Email"
                  placeholder="Email address..."
                  {...form.register("email")}
                />
                <CustomInput
                  id="designation"
                  label="Designation"
                  placeholder="Designation..."
                  {...form.register("designation")}
                />
                <CustomInput
                  id="current_last_company"
                  label="Current/Last Company"
                  placeholder="Last Company..."
                  {...form.register("current_last_company")}
                />

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Experience (Years / Months)
                  </Label>
                  <div className="flex gap-3">
                    <CustomInput
                      id="experience_year"
                      placeholder="Year(s)..."
                      {...form.register("experience_year")}
                      className="w-28 border"
                      type="number"
                    />
                    <CustomInput
                      id="experience_month"
                      placeholder="Month(s)..."
                      {...form.register("experience_month")}
                      className="w-28"
                      type="number"
                    />
                  </div>
                </div>

                <CustomInput
                  id="current_salary"
                  label="Current Salary"
                  placeholder="Current Salary..."
                  {...form.register("current_salary")}
                  type="number"
                />

                <CustomInput
                  id="expected_salary"
                  label="Expected Salary"
                  placeholder="Expected salary..."
                  {...form.register("expected_salary")}
                  type="number"
                />

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Date of Joining
                  </Label>
                  <Flatpickr
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={dateValue}
                    placeholder={`Select Date of Joining`}
                    onChange={(_, dateStr) => {
                      form.setValue("date_of_joining", dateStr);
                    }}
                    options={{
                      dateFormat: "Y-m-d",
                      altInput: true,
                      altFormat: "M j, Y",
                      allowInput: true,
                    }}
                    aria-label={`Filter by Date of Joining`}
                  />
                </div>

                <CustomInput
                  id="notice_period"
                  label="Notice Period (in months)"
                  placeholder="Select notice period"
                  value={form.watch("notice_period")?.toString()}
                  onValueChange={(value) =>
                    form.setValue(
                      "notice_period",
                      value === "none" ? "" : value,
                    )
                  }
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

                <CustomInput
                  id="location"
                  label="Location"
                  placeholder="Location..."
                  {...form.register("location")}
                />

                <CustomInput
                  id="status"
                  label="Status"
                  placeholder="Select status"
                  value={form.watch("status")?.toString()}
                  onValueChange={(value) =>
                    form.setValue("status", value === "none" ? "" : value)
                  }
                  options={IntervieweesStatusList}
                  select
                />

                <CustomInput
                  id="linkedin_link"
                  label="LinkedIn Link"
                  placeholder="LinkedIn URL..."
                  {...form.register("linkedin_link")}
                />

                <CustomInput
                  id="reason_job_change"
                  label="Reason for Job Change"
                  placeholder="Reason..."
                  {...form.register("reason_job_change")}
                  textarea
                />
                <CustomInput
                  id="hr_remark"
                  label="HR Remark"
                  placeholder="Remarks..."
                  {...form.register("hr_remark")}
                  textarea
                />

                <div className="w-full max-w-sm">
                  <Label className="text-sm font-medium mb-1 block">Users</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selected.length && "text-muted-foreground"
                        )}
                      >
                        {selected.map(item => nameMap.get(item.id) || '').filter(name => name).join(", ") || "Select Users"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-2">
                      <ScrollArea className="h-48 w-full">
                        {InterviewerName.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center gap-2 py-1 px-2 hover:bg-muted rounded-md cursor-pointer"
                            onClick={() => toggleUser(user.id)}
                          >
                            <Checkbox
                              id={`user-${user.id}`}
                              checked={selected.some(item => item.id === user.id)}
                            />
                            <Label
                              htmlFor={`user-${user.id}`}
                              className="text-sm cursor-pointer"
                            >
                              {user.firstname}
                            </Label>
                          </div>
                        ))}
                      </ScrollArea>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save Interviewee
                </Button>
              </div>
            </CardContent>
          </form>
        </Form>
        <CardContent>
          <InterviewRound
            InterviewerName={InterviewerName}
            interview_id={InterviewData.id.toString()}
            key={InterviewData.id.toString()} />
        </CardContent>
      </Card>
    </div>
  );
}