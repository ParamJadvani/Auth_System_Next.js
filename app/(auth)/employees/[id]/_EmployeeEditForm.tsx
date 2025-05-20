"use client";

import { useForm } from 'react-hook-form';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
} from "@/components/ui/form";
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
    Phone as PhoneIcon,
    MapPin as MapPinIcon,
} from "lucide-react";
import { IconInput } from "@/components/ui/icon-Input";
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { IEmployeeValues, IUpdateEmployeeValues } from '@/types/employees';
import useEmployees from '@/hooks/use-employees';
import { accountType, bloodGroupList, contributionList, genderList, maritalStatusList, statusList } from '@/helper/helper';

// Preprocess dates to match input types
const processDate = (dateStr?: string | null, type: 'date' | 'month' = 'date'): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return type === 'date'
        ? date.toISOString().split('T')[0] // YYYY-MM-DD
        : date.toISOString().slice(0, 7); // YYYY-MM
};


export function EmployeeEditForm({ data }: { data: IEmployeeValues }) {
    const form = useForm<IUpdateEmployeeValues>({
        defaultValues: {
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
        },
    });
    const router = useRouter();

    const { updateEmployee } = useEmployees();



    const onSubmit = async (formData: IUpdateEmployeeValues) => {
        await updateEmployee(data.id, formData);
    };

    return (
        <Card className="border-0 shadow-none bg-white">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Basic Details */}
                    <CardHeader>
                        <CardTitle className="text-xl">Basic Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8 mt-4">
                        {/* Row 1: firstName, middleName, lastName, employee_id */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="First Name"
                                    id="firstname"
                                    placeholder="First Name"
                                    icon={UserIcon}
                                    className='w-full'
                                    {...form.register("firstname")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Middle Name"
                                    id="middlename"
                                    placeholder="Middle Name"
                                    icon={UserIcon}
                                    className='w-full'
                                    {...form.register("middlename")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Last Name"
                                    id="lastname"
                                    placeholder="Last Name"
                                    icon={UserIcon}
                                    className='w-full'
                                    {...form.register("lastname")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Employee ID"
                                    id="employee_id"
                                    placeholder="Employee ID"
                                    className='w-full'
                                    {...form.register("employee_id")}
                                />
                            </FormControl>
                        </div>
                        {/* Row 2: email, status, gender, marital_status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Email"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    icon={MailIcon}
                                    className='w-full'
                                    {...form.register("email")}
                                />
                            </FormControl>
                            <div className="space-y-1">
                                <label htmlFor="status" className="block text-sm font-medium">
                                    Status <span className="text-destructive">*</span>
                                </label>
                                <Select
                                    value={form.watch("status")}
                                    onValueChange={(value) =>
                                        form.setValue("status", value as IEmployeeValues["status"], {
                                            shouldValidate: true,
                                        })
                                    }
                                >
                                    <SelectTrigger id="status" className='w-full'>
                                        <SelectValue>{form.watch("status")}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusList.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium">
                                    Gender <span className="text-destructive">*</span>
                                </label>
                                <RadioGroup
                                    value={form.watch("gender")}
                                    onValueChange={(value) =>
                                        form.setValue("gender", value as IEmployeeValues["gender"], {
                                            shouldValidate: true,
                                        })
                                    }
                                    className="flex space-x-4 w-full"
                                >
                                    {genderList.map((gender) => (
                                        <div key={gender} className="flex items-center space-x-2">
                                            <RadioGroupItem value={gender} id={gender} />
                                            <label htmlFor={gender} className="font-normal">{gender}</label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium">
                                    Marital Status <span className="text-destructive">*</span>
                                </label>
                                <RadioGroup
                                    value={form.watch("marital_status")}
                                    onValueChange={(value) =>
                                        form.setValue("marital_status", value as IEmployeeValues["marital_status"], {
                                            shouldValidate: true,
                                        })
                                    }
                                    className="flex space-x-4 w-full"
                                >
                                    {maritalStatusList.map((maritalStatus) => (
                                        <div key={maritalStatus} className="flex items-center space-x-2">
                                            <RadioGroupItem value={maritalStatus} id={maritalStatus} />
                                            <label htmlFor={maritalStatus} className="font-normal">
                                                {maritalStatus}
                                            </label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>

                        {/* Row 3: DOB, DOJ ,last_working_date, probation_end_date,*/}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Date of Birth"
                                    id="date_of_birth"
                                    type="date"
                                    icon={CalendarIcon}
                                    className='w-full'
                                    {...form.register("date_of_birth")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Date of Joining"
                                    id="date_of_joining"
                                    type="date"
                                    icon={CalendarIcon}
                                    className='w-full'
                                    {...form.register("date_of_joining")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Last Working Date"
                                    id="last_working_date"
                                    type="date"
                                    icon={CalendarIcon}
                                    className='w-full'
                                    {...form.register("last_working_date")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Probation End Date"
                                    id="probation_end_date"
                                    type="date"
                                    icon={CalendarIcon}
                                    className='w-full'
                                    {...form.register("probation_end_date")}
                                />
                            </FormControl>
                        </div>

                        {/* Row 4:  Salary_increment_date, salary_contract_period, Next_increment_date, Nationality */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Salary Increment Date"
                                    id="salary_increment_date"
                                    type="date"
                                    icon={CalendarIcon}
                                    className='w-full'
                                    {...form.register("salary_increment_date")}
                                />
                            </FormControl>
                            <div className="space-y-1">
                                <label htmlFor="salary_contract_period" className="block text-sm font-medium">
                                    Salary Contract Period
                                </label>
                                <Select
                                    value={form.watch("salary_contract_period") || ""}
                                    onValueChange={(value) => {
                                        const selectedValue = value === "" ? "" : value;
                                        form.setValue("salary_contract_period", selectedValue, { shouldValidate: true });
                                    }}
                                >
                                    <SelectTrigger id="salary_contract_period" className='w-full'>
                                        <SelectValue placeholder="Select Contract Period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Select Contract Period</SelectItem>
                                        {["3", "6", "8", "12", "15", "18", "24"].map((period) => (
                                            <SelectItem key={period} value={period}>
                                                {period} Month
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <FormControl className='space-y-1'>
                                <IconInput
                                    label='Next Increment Date'
                                    id="next_increment_date"
                                    type="date"
                                    icon={CalendarIcon}
                                    className='w-full'
                                    {...form.register("next_increment_date")}
                                    disabled
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Nationality"
                                    id="nationality"
                                    placeholder="Nationality"
                                    icon={GlobeIcon}
                                    className='w-full'
                                    {...form.register("nationality")}
                                />
                            </FormControl>
                        </div>
                        {/* Row 5: blood_group, designation , hold percentage */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-1">
                                <label htmlFor="blood_group" className="block text-sm font-medium">
                                    Blood Group
                                </label>
                                <Select
                                    value={form.watch("blood_group") ?? ""}
                                    onValueChange={(value) =>
                                        form.setValue("blood_group", value as IEmployeeValues["blood_group"], {
                                            shouldValidate: true,
                                        })
                                    }
                                >
                                    <SelectTrigger id="blood_group" className='w-full'>
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
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="designation"
                                    id="designation"
                                    type="text"
                                    placeholder="designation"
                                    className='w-full'
                                    {...form.register("designation")}
                                />
                            </FormControl>
                            <div className="space-y-1">
                                <label htmlFor="hold_percentage" className="block text-sm font-medium">
                                    Hold Percentage
                                </label>
                                <Select
                                    value={form.watch("hold_percentage")?.toString() ?? "none"}
                                    onValueChange={(value) => {
                                        const num = value === "none" ? 0 : parseInt(value, 10);
                                        form.setValue("hold_percentage", num, {
                                            shouldValidate: true,
                                        });
                                    }}
                                >
                                    <SelectTrigger id="hold_percentage" className='w-full'>
                                        <SelectValue placeholder="Select Hold Percentage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Select Hold Percentage</SelectItem>
                                        {["30", "50", "100"].map((pct) => (
                                            <SelectItem key={pct} value={pct}>
                                                {pct} %
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        {/* Row 6: contributions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {(contributionList).map((name) => (
                                <div
                                    key={name}
                                    className="flex items-center w-full bg-muted/30 rounded-md px-4 py-2"
                                >
                                    <label className="capitalize mr-auto text-sm font-medium">
                                        {name.split("_")[0].toUpperCase()} Contribution*
                                    </label>
                                    <Switch
                                        checked={form.watch(name) === 1}
                                        onCheckedChange={(checked) =>
                                            form.setValue(name, checked ? 1 : 0, { shouldValidate: true })
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-300/50 my-4 !w-[80vw] max-w-[80vw] mx-auto" />

                    {/* Contact Details */}
                    <CardHeader>
                        <CardTitle className="text-xl">Contact Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8 mt-4">
                        {/* Row 1: Residential Address, city, state, country, */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Residential Address"
                                    id="residential"
                                    placeholder="Residential Address"
                                    icon={MapPinIcon}
                                    className='w-full'
                                    {...form.register("residential")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="City"
                                    id="city"
                                    placeholder="City"
                                    icon={GlobeIcon}
                                    className='w-full'
                                    {...form.register("city")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="State"
                                    id="state"
                                    placeholder="State"
                                    icon={MapPinIcon}
                                    className='w-full'
                                    {...form.register("state")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Country"
                                    id="country"
                                    placeholder="Country"
                                    icon={GlobeIcon}
                                    className='w-full'
                                    {...form.register("country")}
                                />
                            </FormControl>
                        </div>
                        {/* Row 2:  pincode, contact_no ,home*/}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Pincode"
                                    id="pincode"
                                    placeholder="Pincode"
                                    type="number"
                                    icon={MapPinIcon}
                                    className='w-full'
                                    {...form.register("pincode")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Contact Number"
                                    id="personal"
                                    placeholder="Contact Number"
                                    type="number"
                                    icon={PhoneIcon}
                                    className='w-full'
                                    {...form.register("personal")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Home Contact No"
                                    id="home"
                                    placeholder="Home Contact Number"
                                    type="number"
                                    icon={PhoneIcon}
                                    className='w-full'
                                    {...form.register("home")}
                                />
                            </FormControl>
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-300/50 my-4 !w-[80vw] max-w-[80vw] mx-auto" />

                    {/* Bank Details */}
                    <CardHeader>
                        <CardTitle className="text-xl">Bank Details</CardTitle>

                    </CardHeader>
                    <CardContent className="space-y-8 mt-4">
                        {/* Row 1: bank_name, account_holder_name, account_no ,branch_name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Bank Name"
                                    id="bank_name"
                                    placeholder="Bank Name"
                                    icon={GlobeIcon}
                                    className='w-full'
                                    {...form.register("bank_name")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Account Holder Name"
                                    id="account_holder_name"
                                    placeholder="Account Holder Name"
                                    icon={UserIcon}
                                    className='w-full'
                                    {...form.register("account_holder_name")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Account Number"
                                    id="account_no"
                                    placeholder="Account Number"
                                    type="number"
                                    icon={GlobeIcon}
                                    className='w-full'
                                    {...form.register("account_no")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Branch Name"
                                    id="branch_name"
                                    placeholder="Branch Name"
                                    icon={MapPinIcon}
                                    className='w-full'
                                    {...form.register("branch_name")}
                                />
                            </FormControl>
                        </div>
                        {/* Row 2: ifsc_code, account_type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="IFSC Code"
                                    id="ifsc_code"
                                    placeholder="IFSC Code"
                                    icon={GlobeIcon}
                                    className='w-full'
                                    {...form.register("ifsc_code")}
                                />
                            </FormControl>
                            <div className="space-y-1">
                                <label htmlFor="account_type" className="block text-sm font-medium">
                                    Account Type
                                </label>
                                <Select
                                    value={form.watch("account_type")?.toString() ?? "none"}
                                    onValueChange={(value) => {
                                        const num = value === "none" ? "" : value;
                                        form.setValue("account_type", num, {
                                            shouldValidate: true,
                                        });
                                    }}
                                >
                                    <SelectTrigger id="hold_percentage" className='w-full'>
                                        <SelectValue placeholder="Select Account Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Select Hold Percentage</SelectItem>
                                        {accountType.map((pct) => (
                                            <SelectItem key={pct} value={pct}>
                                                {pct[0].toUpperCase() + pct.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-300/50 my-4 !w-[80vw] max-w-[80vw] mx-auto" />

                    {/* Document Details */}
                    <CardHeader>
                        <CardTitle className="text-xl">Document Details</CardTitle>

                    </CardHeader>
                    <CardContent className="space-y-8 mt-4">
                        {/* Row 1: aadhar_card, pan_card */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Aadhar Card Number"
                                    id="aadhar_card"
                                    placeholder="Aadhar Card Number"
                                    icon={GlobeIcon}
                                    {...form.register("aadhar_card")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="PAN Card Number"
                                    id="pan_card"
                                    placeholder="PAN Card Number"
                                    icon={UserIcon}
                                    {...form.register("pan_card")}
                                />
                            </FormControl>
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-300/50 my-4 !w-[80vw] max-w-[80vw] mx-auto" />

                    {/* Education Details */}
                    <CardHeader>
                        <CardTitle className="text-xl">Education Details</CardTitle>

                    </CardHeader>
                    <CardContent className="space-y-8 mt-4">
                        {/* Row 1: degree, college_name, designation, start_month_year */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Degree"
                                    id="degree"
                                    placeholder="Degree"
                                    icon={GlobeIcon}
                                    className='w-full'
                                    {...form.register("degree")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="College/University"
                                    id="college_name"
                                    placeholder="College/University"
                                    icon={GlobeIcon}
                                    className='w-full'
                                    {...form.register("college_name")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Designation"
                                    id="designation"
                                    placeholder="Designation"
                                    icon={UserIcon}
                                    className='w-full'
                                    {...form.register("designation")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="Start Month/Year"
                                    id="start_month_year"
                                    type="month"
                                    icon={CalendarIcon}
                                    className='w-full'
                                    {...form.register("start_month_year")}
                                />
                            </FormControl>
                        </div>
                        {/* Row 2:  end_month_year */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="End Month/Year"
                                    id="end_month_year"
                                    type="month"
                                    icon={CalendarIcon}
                                    className='w-full'
                                    {...form.register("end_month_year")}
                                />
                            </FormControl>
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-300/50 my-4 !w-[80vw] max-w-[80vw] mx-auto" />

                    {/* PF A/C, UAN & ESI Details */}
                    <CardHeader>
                        <CardTitle className="text-xl">PF A/C, UAN & ESI Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8 mt-4">
                        {/* Row 1: pf_account_no, uan_no, esi_no */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="PF Account Number"
                                    id="pf_account_no"
                                    placeholder="PF Account Number"
                                    icon={GlobeIcon}
                                    className='w-full'
                                    {...form.register("pf_account_no")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="UAN Number"
                                    id="uan_no"
                                    placeholder="UAN Number"
                                    icon={GlobeIcon}
                                    className='w-full'
                                    {...form.register("uan_no")}
                                />
                            </FormControl>
                            <FormControl className="space-y-1">
                                <IconInput
                                    label="ESI Number"
                                    id="esi_no"
                                    placeholder="ESI Number"
                                    icon={GlobeIcon}
                                    className='w-full'
                                    {...form.register("esi_no")}
                                />
                            </FormControl>
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-300/50 my-4 !w-[80vw] max-w-[80vw] mx-auto" />

                    <CardFooter className="flex justify-end space-x-2 mt-4 sticky bottom-10 z-50">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}