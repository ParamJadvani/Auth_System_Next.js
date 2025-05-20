import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
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
import {
    Calendar as CalendarIcon,
    User as UserIcon,
    Mail as MailIcon,
    Globe as GlobeIcon,
    Lock as LockIcon,
    Phone as PhoneIcon,
    MapPin as MapPinIcon,
    LucideIcon,
} from "lucide-react";
import { IconInput } from "@/components/ui/icon-Input";
import { accountType, bloodGroupList, contributionList, genderList, maritalStatusList, processDate, statusList } from '@/helper/helper';
import { Label } from '@/components/ui/label';
import { DialogClose } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { ICreateEmployeeValues, IEmployeeValues, IUpdateEmployeeValues } from '@/types/employees';

const basicFields = [
    { id: "firstname", label: "First Name", icon: UserIcon, type: "text", placeholder: "Enter first name" },
    { id: "middlename", label: "Middle Name", icon: UserIcon, type: "text", placeholder: "Enter middle name" },
    { id: "lastname", label: "Last Name", icon: UserIcon, type: "text", placeholder: "Enter last name" },
    { id: "nationality", label: "Nationality", icon: GlobeIcon, type: "text", placeholder: "Enter nationality" },
    { id: "email", label: "Email", icon: MailIcon, type: "email", placeholder: "Enter email" },
];

const dateFields = [
    { id: "date_of_birth", label: "Date of Birth", icon: CalendarIcon, type: "date", placeholder: "Select date" },
    { id: "date_of_joining", label: "Date of Joining", icon: CalendarIcon, type: "date", placeholder: "Select date" },
    { id: "probation_end_date", label: "Probation End Date", icon: CalendarIcon, type: "date", placeholder: "Select date" },
];

const contactFields = [
    { id: "residential", label: "Residential Address", icon: MapPinIcon, type: "text", placeholder: "Enter address" },
    { id: "city", label: "City", icon: GlobeIcon, type: "text", placeholder: "Enter city" },
    { id: "state", label: "State", icon: MapPinIcon, type: "text", placeholder: "Enter state" },
    { id: "country", label: "Country", icon: GlobeIcon, type: "text", placeholder: "Enter country" },
    { id: "pincode", label: "Pincode", icon: MapPinIcon, type: "number", placeholder: "Enter pincode" },
    { id: "personal", label: "Personal Contact", icon: PhoneIcon, type: "number", placeholder: "Enter contact number" },
    { id: "home", label: "Home Contact", icon: PhoneIcon, type: "number", placeholder: "Enter contact number" },
];

const bankFields = [
    { id: "bank_name", label: "Bank Name", icon: GlobeIcon, type: "text", placeholder: "Enter bank name" },
    { id: "account_holder_name", label: "Account Holder Name", icon: UserIcon, type: "text", placeholder: "Enter account holder name" },
    { id: "account_no", label: "Account Number", icon: GlobeIcon, type: "number", placeholder: "Enter account number" },
    { id: "branch_name", label: "Branch Name", icon: MapPinIcon, type: "text", placeholder: "Enter branch name" },
    { id: "ifsc_code", label: "IFSC Code", icon: GlobeIcon, type: "text", placeholder: "Enter IFSC code" },
];

const documentFields = [
    { id: "aadhar_card", label: "Aadhar Card Number", icon: GlobeIcon, type: "text", placeholder: "Enter Aadhar number" },
    { id: "pan_card", label: "PAN Card Number", icon: UserIcon, type: "text", placeholder: "Enter PAN number" },
];

const educationFields = [
    { id: "degree", label: "Degree", icon: GlobeIcon, type: "text", placeholder: "Enter degree" },
    { id: "college_name", label: "College/University", icon: GlobeIcon, type: "text", placeholder: "Enter college/university" },
    { id: "designation", label: "Designation", icon: UserIcon, type: "text", placeholder: "Enter designation" },
    { id: "start_month_year", label: "Start Month/Year", icon: CalendarIcon, type: "month", placeholder: "Select month/year" },
    { id: "end_month_year", label: "End Month/Year", icon: CalendarIcon, type: "month", placeholder: "Select month/year" },
];

const pfFields = [
    { id: "pf_account_no", label: "PF Account Number", icon: GlobeIcon, type: "text", placeholder: "Enter PF account number" },
    { id: "uan_no", label: "UAN Number", icon: GlobeIcon, type: "text", placeholder: "Enter UAN number" },
    { id: "esi_no", label: "ESI Number", icon: GlobeIcon, type: "text", placeholder: "Enter ESI number" },
];

interface EmployeeFormProps {
    data?: IEmployeeValues;
    isEditing: boolean;
    onSubmit: (data: ICreateEmployeeValues | IUpdateEmployeeValues) => Promise<void>;
}

export function EmployeeForm({ data, isEditing, onSubmit }: EmployeeFormProps) {
    const router = useRouter();

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
                account_no: data.bank_info?.account_no ?? 0,
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
                pincode: data.address?.pincode ?? 0,
                home: data.contact_no?.home ?? 0,
                personal: data.contact_no?.personal ?? 0,
                employee_id: data.employee_id ?? '',
                salary_contract_period: processDate(data.salary_contract_period, 'month'),
                salary_increment_date: processDate(data.salary_increment_date, 'date'),
                next_increment_date: processDate(data.next_increment_date, 'date'),
                status: data.status ?? '',
                nationality: data.nationality ?? '',
                email: data.email ?? '',
                gender: data.gender ?? '',
                marital_status: data.marital_status ?? '',
                esi_contribution: data.esi_contribution ?? 0,
                pf_contribution: data.pf_contribution ?? 0,
                abry_contribution: data.abry_contribution ?? 0,
                hold_percentage: data.hold_percentage ?? 0,
            };
        }
        return {} as ICreateEmployeeValues | IUpdateEmployeeValues;
    };

    const form = useForm<ICreateEmployeeValues | IUpdateEmployeeValues>({
        defaultValues: getDefaultValues(),
    });

    const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">{children}</CardContent>
            <Separator className="bg-gray-500/50 sm:max-w-[80vw] xl:max-w-[86vw] mx-auto" />
        </Card>
    );

    const InputGroup = ({ fields }: { fields: { id: string; label: string; icon: LucideIcon; type: string; placeholder: string }[] }) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map((field) => (
                <FormControl key={field.id}>
                    <IconInput
                        label={field.label}
                        id={field.id}
                        type={field.type}
                        icon={field.icon}
                        placeholder={field.placeholder}
                        {...form.register(field.id as keyof ICreateEmployeeValues)}
                        className="border-gray-300"
                    />
                </FormControl>
            ))}
        </div>
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto bg-white">
                <FormSection title="Basic Details">
                    <InputGroup fields={basicFields} />
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
                    <InputGroup fields={dateFields.filter((f) => f)} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={form.watch("status")}
                                onValueChange={(value) => form.setValue("status", value as IEmployeeValues["status"])}
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
                                onValueChange={(value) => form.setValue("blood_group", value as IEmployeeValues["blood_group"])}
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
                            <InputGroup fields={contactFields.slice(0, 3)} />
                            <InputGroup fields={contactFields.slice(3, 6)} />
                            <InputGroup fields={contactFields.slice(6)} />
                        </FormSection>

                        <FormSection title="Bank Details">
                            <InputGroup fields={bankFields.slice(0, 3)} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {bankFields.slice(3, 5).map((field) => (
                                    <FormControl key={field.id}>
                                        <IconInput
                                            label={field.label}
                                            id={field.id}
                                            type={field.type}
                                            icon={field.icon}
                                            placeholder={field.placeholder}
                                            {...form.register(field.id as keyof ICreateEmployeeValues)}
                                            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </FormControl>
                                ))}
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
                            <InputGroup fields={documentFields} />
                        </FormSection>

                        <FormSection title="Education Details">
                            <InputGroup fields={educationFields.slice(0, 3)} />
                            <InputGroup fields={educationFields.slice(3)} />
                        </FormSection>

                        <FormSection title="PF A/C, UAN & ESI Details">
                            <InputGroup fields={pfFields} />
                        </FormSection>
                    </>
                )}

                <CardFooter
                    className={`${isEditing ? "fixed bottom-0 left-0 right-0" : "sticky bottom-0"} z-50 py-3 sm:py-4 border-gray-200`}
                >
                    <div className="flex justify-end space-x-2 sm:space-x-3 mx-auto w-full px-4 sm:px-6">
                        {isEditing ? (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="border-gray-300 text-gray-700 hover:bg-gray-100 text-sm px-3 py-2 sm:px-4 sm:py-2 flex-1 sm:flex-none"
                                disabled={form.formState.isSubmitting}
                            >
                                Cancel
                            </Button>
                        ) : (
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-100 text-sm px-3 py-2 sm:px-4 sm:py-2 flex-1 sm:flex-none"
                                    disabled={form.formState.isSubmitting}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                        )}
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            loading={form.formState.isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 sm:px-4 sm:py-2 flex-1 sm:flex-none"
                        >
                            Save
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Form>
    );
}