import { useForm } from "react-hook-form";
import {
    Card,
    CardHeader,
    CardContent,
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
import { IAdminValues, ICreateAdminValues, IUpdateAdminValues } from '@/types/admin';
import { accountType, bloodGroupList, contributionList, genderList, maritalStatusList, processDate, statusList } from '@/helper/helper';
import { Label } from '@/components/ui/label';
import { FormFooter } from '@/components/ui/form/form-footer';
import { IconInput } from '@/components/ui/icon-Input';

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
            };
        }
        return {} as ICreateAdminValues | IUpdateAdminValues;
    };

    const form = useForm<ICreateAdminValues | IUpdateAdminValues>({
        defaultValues: getDefaultValues(),
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-lg shadow-xs p-4 sm:p-6 lg:p-8">
                <Card className='border-0 shadow-none border-b-2 border-gray-300 rounded-none pt-3 pb-6'>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Basic Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2 items-center">
                        <FormControl >
                            <IconInput id='firstname' label="First Name" placeholder="Enter first name" {...form.register("firstname")} className='w-full border px-3 py-2' />
                        </FormControl>
                        <FormControl >
                            <IconInput id='middlename' label="Middle Name" placeholder="Enter middle name" {...form.register("middlename")} className='w-full border px-3 py-2' />
                        </FormControl>
                        <FormControl >
                            <IconInput id='lastname' label="Last Name" placeholder="Enter last name" {...form.register("lastname")} className='w-full border px-3 py-2' />
                        </FormControl>
                        <FormControl >
                            <IconInput id='nationality' label="Nationality" placeholder="Enter nationality" {...form.register("nationality")} className='w-full border px-3 py-2' />
                        </FormControl>
                        <FormControl >
                            <IconInput id='email' label="Email" type="email" placeholder="Enter email" {...form.register("email")} className='w-full border px-3 py-2' />
                        </FormControl>
                        {!isEditing && (
                            <FormControl >
                                <IconInput id='password' label="Password" type="password" placeholder="Enter password" {...form.register("password")} className='w-full border px-3 py-2' />
                            </FormControl>
                        )}
                        {/* Gender */}
                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-black">
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
                        {/* Marital Status */}
                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-black">
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
                        <FormControl>
                            <IconInput id='date_of_birth' label="Date of Birth" type="date" placeholder="Select date" {...form.register("date_of_birth")} className='w-full border px-3 py-2' />
                        </FormControl>
                        <FormControl >
                            <IconInput id='date_of_joining' label="Date of Joining" type="date" placeholder="Select date" {...form.register("date_of_joining")} className='w-full border px-3 py-2' />
                        </FormControl>
                        <FormControl >
                            <IconInput id='probation_end_date' label="Probation End Date" type="date" placeholder="Select date" {...form.register("probation_end_date")} className='w-full border px-3 py-2' />
                        </FormControl>
                        {/* Status */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-black">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <div className='relative'>
                                <Select
                                    value={form.watch("status")}
                                    onValueChange={(value) => form.setValue("status", value as IAdminValues["status"])}
                                    aria-label="Status"
                                >
                                    <SelectTrigger className="py-2 px-3 border-gray-300 focus:ring-blue-500 w-full rounded-xs">
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
                        <FormControl >
                            <IconInput id='last_working_date' label="Last Working Date" type="date" placeholder="Select date" {...form.register("last_working_date")} className='w-full border px-3 py-2' />
                        </FormControl>
                        {/* Blood Group */}
                        <div className="space-y-2">
                            <Label className="font-medium text-sm text-black">Blood Group</Label>
                            <div className='relative'>
                                <Select
                                    value={form.watch("blood_group") || ""}
                                    onValueChange={(value) => {
                                        const finalValue = value === "none" ? null : value;
                                        form.setValue("blood_group", finalValue as IAdminValues["blood_group"])
                                    }}
                                    aria-label="Blood Group"
                                >
                                    <SelectTrigger className="py-2 px-3 border-gray-300 focus:ring-blue-500 w-full rounded-xs">
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
                        </div>

                    </CardContent>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2 items-center">
                        {/* Contributions */}
                        {contributionList.map((name) => (
                            <div key={name} className='space-y-2 p-0 m-0 flex-col'>
                                <Label className="capitalize text-sm font-medium text-black">
                                    {name.split("_")[0]} Contribution <span className="text-red-500">*</span>
                                </Label>
                                <Switch
                                    checked={form.watch(name) === 1}
                                    onCheckedChange={(checked) => form.setValue(name, checked ? 1 : 0)}
                                    aria-label={`${name.split("_")[0]} Contribution`}
                                />

                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Additional Sections for Edit Mode */}
                {isEditing && (
                    <>
                        <Card className='border-0 shadow-none border-b-2 border-gray-300 rounded-none pt-3 pb-6'>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Contact Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2 items-center">
                                <FormControl >
                                    <IconInput id='residential' label="Residential Address" placeholder="Enter address" {...form.register("residential")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='city' label="City" placeholder="Enter city" {...form.register("city")} className='w-full border pxGeography-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='state' label="State" placeholder="Enter state" {...form.register("state")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='country' label="Country" placeholder="Enter country" {...form.register("country")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='pincode' label="Pincode" type="number" placeholder="Enter pincode" {...form.register("pincode")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='personal' label="Personal Contact" type="number" placeholder="Enter personal contact" {...form.register("personal")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='home' label="Home Contact" type="number" placeholder="Enter home contact" {...form.register("home")} className='w-full border px-3 py-2' />
                                </FormControl>
                            </CardContent>
                        </Card>

                        <Card className='border-0 shadow-none border-b-2 border-gray-300 rounded-none pt-3 pb-6'>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Bank Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2 items-center">
                                <FormControl >
                                    <IconInput id='bank_name' label="Bank Name" placeholder="Enter bank name" {...form.register("bank_name")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='account_holder_name' label="Account Holder Name" placeholder="Enter account holder name" {...form.register("account_holder_name")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='account_no' label="Account Number" type="number" placeholder="Enter account number" {...form.register("account_no")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='branch_name' label="Branch Name" placeholder="Enter branch name" {...form.register("branch_name")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='ifsc_code' label="IFSC Code" placeholder="Enter IFSC code" {...form.register("ifsc_code")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium text-black">Account Type</Label>
                                    <div className='relative'>
                                        <Select
                                            value={form.watch("account_type") || ""}
                                            onValueChange={(value) => {
                                                const finalValue = value === "none" ? "" : value;
                                                form.setValue("account_type", finalValue)
                                            }}
                                            aria-label="Account Type"
                                        >
                                            <SelectTrigger className="py-2 px-3 border-gray-300 focus:ring-blue-500 w-full rounded-xs">
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
                                </div>
                            </CardContent>
                        </Card>

                        <Card className='border-0 shadow-none border-b-2 border-gray-300 rounded-none pt-3 pb-6'>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Document Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2 items-center">
                                <FormControl >
                                    <IconInput id='aadhar_card' label="Aadhar Card Number" placeholder="Enter Aadhar number" {...form.register("aadhar_card")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='pan_card' label="PAN Card Number" placeholder="Enter PAN number" {...form.register("pan_card")} className='w-full border px-3 py-2' />
                                </FormControl>
                            </CardContent>
                        </Card>

                        <Card className='border-0 shadow-none border-b-2 border-gray-300 rounded-none pt-3 pb-6'>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Education Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2 items-center">
                                <FormControl >
                                    <IconInput id='degree' label="Degree" placeholder="Enter degree" {...form.register("degree")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='college_name' label="College/University" placeholder="Enter college/university" {...form.register("college_name")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='designation' label="Designation" placeholder="Enter designation" {...form.register("designation")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='start_month_year' label="Start Month/Year" type="month" placeholder="Select month/year" {...form.register("start_month_year")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='end_month_year' label="End Month/Year" type="month" placeholder="Select month/year" {...form.register("end_month_year")} className='w-full border px-3 py-2' />
                                </FormControl>
                            </CardContent>
                        </Card>

                        <Card className='border-0 shadow-none rounded-none pt-3 pb-0'>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">PF A/C, UAN & ESI Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2 items-center">
                                <FormControl >
                                    <IconInput id='pf_account_no' label="PF Account Number" placeholder="Enter PF account number" {...form.register("pf_account_no")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='uan_no' label="UAN Number" placeholder="Enter UAN number" {...form.register("uan_no")} className='w-full border px-3 py-2' />
                                </FormControl>
                                <FormControl >
                                    <IconInput id='esi_no' label="ESI Number" placeholder="Enter ESI number" {...form.register("esi_no")} className='w-full border px-3 py-2' />
                                </FormControl>
                            </CardContent>
                        </Card>
                    </>
                )}
                <FormFooter editing={isEditing} submitting={form.formState.isSubmitting} />
            </form>
        </Form>
    );
}