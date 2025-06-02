"use client";

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
import { accountType, bloodGroupList, contributionList, genderList, maritalStatusList, processDate, salary_Contract_Period, statusList } from 'helper/helper';
import { Label } from '@/components/ui/label';
import { ICreateEmployeeValues, IEmployeeValues, IUpdateEmployeeValues } from '@/types/employees';
import { InputGroup } from '@/components/ui/form/input-group';
import { FormSection } from '@/components/ui/form/form-section';
import { FormFooter } from '@/components/ui/form/form-footer';
import { employeeFields } from '@/constants/fields';
import { PasswordInput } from '@/components/ui/password-Input';

interface EmployeeFormProps {
    data?: IEmployeeValues;
    editing?: boolean;
    onSubmit: (data: ICreateEmployeeValues | IUpdateEmployeeValues) => Promise<void>;
}

export function EmployeeForm({ data, editing = false, onSubmit }: EmployeeFormProps) {
    const getDefaultValues = (): ICreateEmployeeValues | IUpdateEmployeeValues => {
        if (!editing) {
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
                hold_percentage: "",
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
                salary_increment_date: processDate(data.salary_increment_date, 'month'),
                next_increment_date: processDate(data.next_increment_date, 'month'),
                status: data.status || "active",
                nationality: data.nationality,
                hold_percentage: data.hold_percentage?.toString(),
            };
        }
        return {} as ICreateEmployeeValues | IUpdateEmployeeValues;
    };

    const form = useForm<ICreateEmployeeValues | IUpdateEmployeeValues>({
        defaultValues: getDefaultValues(),
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-md">
                {/* Basic Details */}
                <FormSection title="Basic Details" editing={editing} classname='pb-2'>
                    <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                        fields={employeeFields.basic.slice(0, 5)}
                        register={form.register}
                    />
                    {!editing && (
                        <FormControl>
                            <PasswordInput
                                label="Password"
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                {...form.register("password")}
                                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                aria-required
                            />
                        </FormControl>
                    )}

                    {/* Status */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-black ml-2">
                            Status <span className="text-red-500">*</span>
                        </Label>
                        <div className='relative'>
                            <Select
                                value={form.watch("status")}
                                onValueChange={(value) => form.setValue("status", value as IEmployeeValues["status"])}
                                aria-label="Status"
                            >
                                <SelectTrigger className="py-2 px-3 border-gray-300 focus:ring-blue-500 w-full rounded-full">
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
                    </div>

                    {/* Gender */}
                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-black ml-2">
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
                                    <RadioGroupItem value={gender} id={gender} className='p-2' />
                                    <Label htmlFor={gender} className="text-sm text-gray-600 capitalize">{gender}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    {/* Marital Status */}
                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-black ml-2">
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
                                    <RadioGroupItem value={status} id={status} className='p-2' />
                                    <Label htmlFor={status} className="text-sm text-gray-600 capitalize">{status}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    {/* Dates */}
                    <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                        fields={employeeFields.date}
                        register={form.register}
                    />

                    {/* salary contract period */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-black ml-2">Salary Contract Period</Label>
                        <Select
                            value={form.watch("salary_contract_period")?.toString() === "0" ? "" : form.watch("salary_contract_period")?.toString() || ""}
                            onValueChange={(value) => {
                                const finalValue = value === "none" ? null : value;
                                form.setValue("salary_contract_period", finalValue)
                            }}
                            aria-label="Salary Contract Period"
                        >
                            <SelectTrigger className="py-2 px-3 border-gray-300 focus:ring-blue-500 w-full rounded-full">
                                <SelectValue placeholder="Salary Contract Period" />
                            </SelectTrigger>
                            <SelectContent>
                                {salary_Contract_Period.map((period) => (
                                    <SelectItem key={period} value={period}>
                                        {period === "none" ? "Salary Contract Period" : period + " Months"}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Next Increment Date */}
                    <FormControl className='w-full'>
                        <IconInput
                            label="Next Increment Date"
                            id="next_increment_date"
                            type="month"
                            placeholder="Select month/year"
                            value={form.watch("next_increment_date") ?? ""}
                            className="border-gray-300 focus:ring-blue-500"
                            {...form.register("next_increment_date")}
                            disabled
                        />
                    </FormControl>

                    <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                        fields={employeeFields.basic.slice(5)}
                        register={form.register}
                    />
                    {/* Blood Group */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium ml-2 text-black">Blood Group</Label>
                        <Select
                            value={form.watch("blood_group") || ""}
                            onValueChange={(value) => {
                                const finalValue = value === "none" ? null : value;
                                form.setValue("blood_group", finalValue as IEmployeeValues["blood_group"])
                            }}
                            aria-label="Blood Group"
                        >
                            <SelectTrigger className="py-2 px-3 border-gray-300 focus:ring-blue-500 w-full rounded-full">
                                <SelectValue placeholder="Blood Group" />
                            </SelectTrigger>
                            <SelectContent>
                                {bloodGroupList.map((bg) => (
                                    <SelectItem key={bg} value={bg}>
                                        {bg === "none" ? "Blood Group" : bg.toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Hold Percentage */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium ml-2 text-black">Hold Percentage</Label>
                        <Select
                            value={form.watch("hold_percentage")?.toString()}
                            onValueChange={(value) => {
                                const finalValue = value === "none" ? "" : value;
                                form.setValue("hold_percentage", finalValue)
                            }}
                            aria-label="Hold Percentage"
                        >
                            <SelectTrigger className="py-2 px-3 border-gray-300 focus:ring-blue-500 w-full rounded-full">
                                <SelectValue placeholder="Hold Percentage" />
                            </SelectTrigger>
                            <SelectContent>
                                {["none", "30", "50", "100"].map((pct) => (
                                    <SelectItem key={pct} value={pct}>
                                        {pct === "none" ? "Hold Percentage" : pct + "%"}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Contributions */}
                    {contributionList.map((name) => (
                        <div key={name} className="w-full rounded-lg px-4 py-3">
                            <Label className="capitalize mr-auto text-sm font-medium text-black mb-2">
                                {name.split("_")[0]} Contribution<span className="text-red-500">*</span>
                            </Label>
                            <Switch
                                checked={form.watch(name) === 1}
                                onCheckedChange={(checked) => form.setValue(name, checked ? 1 : 0)}
                                aria-label={`${name.split("_")[0]} Contribution`}
                            />
                        </div>
                    ))}
                </FormSection>
                {/* Update Fields... */}
                {editing && (
                    <>
                        <FormSection title="Contact Details" editing={editing} classname='py-3'>
                            <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                                fields={employeeFields.contact}
                                register={form.register}
                            />
                        </FormSection>

                        <FormSection title="Bank Details" editing={editing} classname='py-3'>
                            <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                                fields={employeeFields.bank}
                                register={form.register}
                            />
                            {/* Account Type */}
                            <div className="space-y-2   ">
                                <Label className="text-sm font-medium ml-2 text-black">Account Type</Label>
                                <Select
                                    value={form.watch("account_type") || ""}
                                    onValueChange={(value) => {
                                        const finalValue = value === "none" ? "" : value;
                                        form.setValue("account_type", finalValue)
                                    }}
                                    aria-label="Account Type"
                                >
                                    <SelectTrigger className="py-2 px-3 border-gray-300 focus:ring-blue-500 w-full rounded-full">
                                        <SelectValue placeholder="Account Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {accountType.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type === "none" ? "Account Type" : type.charAt(0).toUpperCase() + type.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </FormSection>

                        <FormSection title="Document Details" editing={editing} classname='py-3'>
                            <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                                fields={employeeFields.document}
                                register={form.register}
                            />
                        </FormSection>

                        <FormSection title="Education Details" editing={editing} classname='py-3'>
                            <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                                fields={employeeFields.education}
                                register={form.register}
                            />
                        </FormSection>

                        <FormSection title="PF A/C, UAN & ESI Details" editing={editing} classname='py-3'>
                            <InputGroup<ICreateEmployeeValues | IUpdateEmployeeValues>
                                fields={employeeFields.pf}
                                register={form.register}
                            />
                        </FormSection>
                    </>
                )}
                <FormFooter editing={editing} submitting={form.formState.isSubmitting} />
            </form>
        </Form>
    );
}