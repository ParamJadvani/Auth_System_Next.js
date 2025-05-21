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
import { IAdminValues, ICreateAdminValues, IUpdateAdminValues } from '@/types/admin';
import { accountType, bloodGroupList, contributionList, genderList, maritalStatusList, processDate, statusList } from '@/helper/helper';
import { Label } from '@/components/ui/label';
import InputGroup from '@/components/ui/form/input-group';
import { FormFooter } from '@/components/ui/form/form-footer';
import { FormSection } from '@/components/ui/form/form-section';
import { adminFields } from '@/constants/fields';
import { CalendarIcon, LockIcon } from 'lucide-react';

interface AdminFormProps {
    data?: IAdminValues;
    isEditing: boolean;
    onSubmit: (data: ICreateAdminValues | IUpdateAdminValues) => Promise<void>;
}

export function AdminForm({ data, isEditing, onSubmit }: AdminFormProps) {
    const getDefaultValues = (): ICreateAdminValues | IUpdateAdminValues => {
        if (!isEditing) {
            return {
                firstname: "",
                middlename: "",
                lastname: "",
                nationality: "",
                email: "",
                gender: "male",
                marital_status: "unmarried",
                blood_group: "",
                date_of_birth: "",
                date_of_joining: "",
                probation_end_date: "",
                status: "active",
                last_working_date: "",
                pf_contribution: 0,
                abry_contribution: 0,
                esi_contribution: 0,
                password: "",
            };
        } else if (data) {
            return {
                ...data,
                middlename: data.middlename ?? '',
                lastname: data.lastname ?? '',
                designation: data.designation ?? '',
                aadhar_card: data.aadhar_card ?? '',
                pan_card: data.pan_card ?? '',
                pf_account_no: data.pf_account_no ?? '',
                uan_no: data.uan_no ?? '',
                esi_no: data.esi_no ?? '',
                blood_group: data.blood_group ?? '',
                residential: data.address?.residential ?? '',
                city: data.address?.city ?? '',
                state: data.address?.state ?? '',
                country: data.address?.country ?? '',
                bank_name: data.bank_info?.bank_name ?? '',
                account_holder_name: data.bank_info?.account_holder_name ?? '',
                account_no: data.bank_info?.account_no ?? null,
                branch_name: data.bank_info?.branch_name ?? '',
                ifsc_code: data.bank_info?.ifsc_code ?? '',
                account_type: data.bank_info?.account_type ?? '',
                degree: data.education_info?.degree ?? '',
                college_name: data.education_info?.college_name ?? '',
                date_of_birth: processDate(data.date_of_birth, 'date'),
                last_working_date: processDate(data.last_working_date, 'date'),
                date_of_joining: processDate(data.date_of_joining, 'date'),
                probation_end_date: processDate(data.probation_end_date, 'date'),
                start_month_year: processDate(data.education_info?.start_month_year, 'month'),
                end_month_year: processDate(data.education_info?.end_month_year, 'month'),
                pincode: data.address?.pincode ?? null,
                home: data.contact_no?.home ?? null,
                personal: data.contact_no?.personal ?? null,
            };
        }
        return {} as ICreateAdminValues | IUpdateAdminValues;
    };

    const form = useForm<ICreateAdminValues | IUpdateAdminValues>({
        defaultValues: getDefaultValues(),
    });



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto bg-white">
                <FormSection title="Basic Details">
                    <InputGroup<ICreateAdminValues | IUpdateAdminValues> fields={adminFields.basic} register={form.register} />
                    {!isEditing && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Gender <span className="text-red-500">*</span>
                            </Label>
                            <RadioGroup
                                value={form.watch("gender")}
                                onValueChange={(value) => form.setValue("gender", value as IAdminValues["gender"])}
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
                                onValueChange={(value) => form.setValue("marital_status", value as IAdminValues["marital_status"])}
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
                    <InputGroup<ICreateAdminValues | IUpdateAdminValues> fields={adminFields.date} register={form.register} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={form.watch("status")}
                                onValueChange={(value) => form.setValue("status", value as IAdminValues["status"])}
                                aria-label="Status"
                            >
                                <SelectTrigger className="border-gray-300 focus:ring-blue-500 w-full">
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
                        <FormControl>
                            <IconInput
                                label="Last Working Date"
                                id="last_working_date"
                                type="date"
                                icon={CalendarIcon}
                                placeholder="Select date"
                                {...form.register("last_working_date")}
                                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </FormControl>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Blood Group</Label>
                            <Select
                                value={form.watch("blood_group") ?? ""}
                                onValueChange={(value) => form.setValue("blood_group", value as IAdminValues["blood_group"])}
                                aria-label="Blood Group"
                            >
                                <SelectTrigger className="border-gray-300 focus:ring-blue-500 w-full">
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
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                            <InputGroup<ICreateAdminValues | IUpdateAdminValues> fields={adminFields.contact.slice(0, 2)} register={form.register} />
                            <InputGroup<ICreateAdminValues | IUpdateAdminValues> fields={adminFields.contact.slice(2)} register={form.register} />
                        </FormSection>

                        <FormSection title="Bank Details">
                            <InputGroup<ICreateAdminValues | IUpdateAdminValues> fields={adminFields.bank} register={form.register} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Account Type</Label>
                                    <Select
                                        value={form.watch("account_type")}
                                        onValueChange={(value) => form.setValue("account_type", value)}
                                        aria-label="Account Type"
                                    >
                                        <SelectTrigger className="border-gray-300 focus:ring-blue-500">
                                            <SelectValue placeholder="Select Account Type" />
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
                            <InputGroup<ICreateAdminValues | IUpdateAdminValues> fields={adminFields.document} register={form.register} />
                        </FormSection>

                        <FormSection title="Education Details">
                            <InputGroup<ICreateAdminValues | IUpdateAdminValues> fields={adminFields.education.slice(0, 3)} register={form.register} />
                            <InputGroup<ICreateAdminValues | IUpdateAdminValues> fields={adminFields.education.slice(3)} register={form.register} />
                        </FormSection>

                        <FormSection title="PF A/C, UAN & ESI Details">
                            <InputGroup<ICreateAdminValues | IUpdateAdminValues> fields={adminFields.pf} register={form.register} />
                        </FormSection>
                    </>
                )}

                <FormFooter editing={isEditing} submitting={form.formState.isSubmitting} />
            </form>
        </Form>
    );
}