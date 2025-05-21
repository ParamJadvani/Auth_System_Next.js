import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { IconInput } from "@/components/ui/icon-Input";
import { accountType, bloodGroupList, contributionList, genderList, maritalStatusList, processDate, salary_Contract_Period, statusList } from '@/helper/helper';
import { Label } from '@/components/ui/label';
import { ICreateEmployeeValues, IEmployeeValues, IUpdateEmployeeValues } from '@/types/employees';
import InputGroup from '@/components/ui/form/input-group';
import { FormSection } from '@/components/ui/form/form-section';
import { FormFooter } from '@/components/ui/form/form-footer';
import { employeeFields } from '@/constants/fields';
import { LockIcon } from 'lucide-react';

interface EmployeeFormProps {
    data?: IEmployeeValues;
    isEditing?: boolean;
    onSubmit: (data: ICreateEmployeeValues | IUpdateEmployeeValues) => Promise<void>;
}

export function EmployeeForm({ data, isEditing = false, onSubmit }: EmployeeFormProps) {
    const getDefaultValues = (): ICreateEmployeeValues | IUpdateEmployeeValues => {
        if (!isEditing) {
            return {
                firstname: "",
                middlename: "",
                lastname: "",
                email: "",
                password: "",
                gender: "male",
                marital_status: "unmarried",
                blood_group: "",
                date_of_birth: "",
                date_of_joining: "",
                probation_end_date: "",
                status: "active",
                last_working_date: "",
                abry_contribution: 0,
                esi_contribution: 0,
                pf_contribution: 0,
                employee_id: "",
                next_increment_date: "",
                salary_contract_period: "",
                salary_increment_date: "",
                nationality: "",
                hold_percentage: 0,
            };
        } else if (data) {
            return {
                ...data,
                middlename: data.middlename,
                lastname: data.lastname,
                designation: data.designation,
                aadhar_card: data.aadhar_card,
                pan_card: data.pan_card,
                pf_account_no: data.pf_account_no,
                uan_no: data.uan_no,
                esi_no: data.esi_no,
                blood_group: data.blood_group,
                residential: data.address?.residential,
                city: data.address?.city,
                state: data.address?.state,
                country: data.address?.country,
                bank_name: data.bank_info?.bank_name,
                account_holder_name: data.bank_info?.account_holder_name,
                account_no: data.bank_info?.account_no,
                branch_name: data.bank_info?.branch_name,
                ifsc_code: data.bank_info?.ifsc_code,
                account_type: data.bank_info?.account_type,
                degree: data.education_info?.degree,
                college_name: data.education_info?.college_name,
                date_of_birth: processDate(data.date_of_birth, 'date'),
                last_working_date: processDate(data.last_working_date, 'date'),
                date_of_joining: processDate(data.date_of_joining, 'date'),
                probation_end_date: processDate(data.probation_end_date, 'date'),
                start_month_year: processDate(data.education_info?.start_month_year, 'month'),
                end_month_year: processDate(data.education_info?.end_month_year, 'month'),
                pincode: data.address?.pincode,
                home: data.contact_no?.home,
                personal: data.contact_no?.personal,
                employee_id: data.employee_id,
                salary_contract_period: data.salary_contract_period,
                salary_increment_date: processDate(data.salary_increment_date, 'date'),
                next_increment_date: processDate(data.next_increment_date, 'date'),
                status: data.status,
                nationality: data.nationality,
                email: data.email,
                gender: data.gender,
                marital_status: data.marital_status,
                esi_contribution: data.esi_contribution,
                pf_contribution: data.pf_contribution,
                abry_contribution: data.abry_contribution,
                hold_percentage: data.hold_percentage,
            };
        }
        return {} as ICreateEmployeeValues | IUpdateEmployeeValues;
    };

    const form = useForm<ICreateEmployeeValues | IUpdateEmployeeValues>({
        defaultValues: getDefaultValues(),
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto bg-white rounded-md">
                <FormSection title="Basic Details">
                    <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                        fields={employeeFields.basic}
                        register={form.register}
                        classname="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    />
                    {!isEditing && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl>
                                <IconInput
                                    label="Password"
                                    id="password"
                                    type="password"
                                    icon={LockIcon}
                                    placeholder="Enter password"
                                    {...form.register("password")}
                                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    aria-required
                                />
                            </FormControl>
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Gender <span className="text-red-500">*</span>
                            </Label>
                            <RadioGroup
                                value={form.watch("gender")}
                                onValueChange={(value) => form.setValue("gender", value as IEmployeeValues["gender"])}
                                className="flex flex-wrap gap-4"
                                aria-label="Gender"
                            >
                                {genderList.map((gender) => (
                                    <div key={gender} className="flex items-center space-x-2">
                                        <RadioGroupItem value={gender} id={gender} />
                                        <Label htmlFor={gender} className="text-sm text-gray-600 capitalize">{gender}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Marital Status <span className="text-red-500">*</span>
                            </Label>
                            <RadioGroup
                                value={form.watch("marital_status")}
                                onValueChange={(value) => form.setValue("marital_status", value as IEmployeeValues["marital_status"])}
                                className="flex flex-wrap gap-4"
                                aria-label="Marital Status"
                            >
                                {maritalStatusList.map((status) => (
                                    <div key={status} className="flex items-center space-x-2">
                                        <RadioGroupItem value={status} id={status} />
                                        <Label htmlFor={status} className="text-sm text-gray-600 capitalize">{status}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                    <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                        fields={employeeFields.date}
                        register={form.register}
                        classname="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={form.watch("status")}
                                onValueChange={(value) => form.setValue("status", value as IEmployeeValues["status"])}
                                aria-label="Status"
                            >
                                <SelectTrigger className="border-gray-300 focus:ring-blue-500">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusList.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Blood Group</Label>
                            <Select
                                value={form.watch("blood_group") ?? ""}
                                onValueChange={(value) => form.setValue("blood_group", value as IEmployeeValues["blood_group"])}
                                aria-label="Blood Group"
                            >
                                <SelectTrigger className="border-gray-300 focus:ring-blue-500">
                                    <SelectValue placeholder="Select blood group" />
                                </SelectTrigger>
                                <SelectContent>
                                    {bloodGroupList.map((bg) => (
                                        <SelectItem key={bg} value={bg}>
                                            {bg.toUpperCase()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Salary Contract Period</Label>
                            <Select
                                value={form.watch("salary_contract_period") || ""}
                                onValueChange={(value) => form.setValue("salary_contract_period", value)}
                                aria-label="Salary Contract Period"
                            >
                                <SelectTrigger className="border-gray-300 focus:ring-blue-500">
                                    <SelectValue placeholder="Select Contract Period">
                                        {form.watch("salary_contract_period") || "Select Contract Period"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {salary_Contract_Period.map((period) => (
                                        <SelectItem key={period} value={period}>{period} Months</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Hold Percentage</Label>
                            <Select
                                value={form.watch("hold_percentage")?.toString() ?? ""}
                                onValueChange={(value) => form.setValue("hold_percentage", parseInt(value))}
                                aria-label="Hold Percentage"
                            >
                                <SelectTrigger className="border-gray-300 focus:ring-blue-500">
                                    <SelectValue placeholder="Select percentage">
                                        {form.watch("hold_percentage")?.toString() ?? "Select Percentage"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {["30", "50", "100"].map((pct) => (
                                        <SelectItem key={pct} value={pct}>{pct}%</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {contributionList.map((name) => (
                            <div key={name} className="flex items-center w-full bg-gray-100 rounded-lg px-4 py-3">
                                <Label className="capitalize mr-auto text-sm font-medium text-gray-700">
                                    {name.split("_")[0]} Contribution
                                </Label>
                                <Switch
                                    checked={form.watch(name) === 1}
                                    onCheckedChange={(checked) => form.setValue(name, checked ? 1 : 0)}
                                    aria-label={`${name.split("_")[0]} Contribution`}
                                />
                            </div>
                        ))}
                    </div>
                </FormSection>

                {isEditing && (
                    <>
                        <FormSection title="Contact Details">
                            <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                                fields={employeeFields.contact}
                                register={form.register}
                                classname="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                            />
                        </FormSection>

                        <FormSection title="Bank Details">
                            <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                                fields={employeeFields.bank}
                                register={form.register}
                                classname="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Account Type</Label>
                                    <Select
                                        value={form.watch("account_type")}
                                        onValueChange={(value) => form.setValue("account_type", value)}
                                        aria-label="Account Type"
                                    >
                                        <SelectTrigger className="border-gray-300 focus:ring-blue-500">
                                            <SelectValue placeholder="Select account type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {accountType.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="Document Details">
                            <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                                fields={employeeFields.document}
                                register={form.register}
                                classname="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                            />
                        </FormSection>

                        <FormSection title="Education Details">
                            <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                                fields={employeeFields.education}
                                register={form.register}
                                classname="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                            />
                        </FormSection>

                        <FormSection title="PF A/C, UAN & ESI Details">
                            <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                                fields={employeeFields.pf}
                                register={form.register}
                                classname="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                            />
                        </FormSection>
                    </>
                )}
                <FormFooter editing={isEditing} submitting={form.formState.isSubmitting} />
            </form>
        </Form>
    );
}