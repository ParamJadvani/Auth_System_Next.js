"use client";
import { IAdminValues } from '@/types/admin';
import { useForm } from 'react-hook-form';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from '@/components/ui/separator';
import useAdmin from '@/hooks/use-Admin';
import { Input } from "@/components/ui/input";
import {
    Calendar as CalendarIcon,
    User as UserIcon,
    Mail as MailIcon,
    Globe as GlobeIcon,
    Phone as PhoneIcon,
    MapPin as MapPinIcon,
} from "lucide-react";

const processDate = (dateStr?: string | null): string => {
    return dateStr ? new Date(dateStr).toISOString().split("T")[0] : '';
};

export function AdminEditForm({ data }: { data: IAdminValues }) {
    const form = useForm<IAdminValues>({
        defaultValues: {
            ...data,
            date_of_birth: processDate(data.date_of_birth),
            date_of_joining: processDate(data.date_of_joining),
            last_working_date: processDate(data.last_working_date),
            probation_end_date: processDate(data.probation_end_date),
            start_month_year: processDate(data.start_month_year),
            end_month_year: processDate(data.end_month_year),
        },
    });
    const updateAdmin = useAdmin().updateAdmin;

    const onSubmit = async (data: IAdminValues) => {
        updateAdmin(data.id, data);
    };

    return (
        <Card className="border-0 shadow-none bg-white">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Basic Details */}
                    <CardHeader className="my-5">
                        <CardTitle className="text-xl text-gray-800">Basic Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="firstname"
                                        placeholder="First Name"
                                        className="pr-10"
                                        {...form.register('firstname')}
                                    />
                                    <UserIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="middlename" className="block text-sm font-medium text-gray-700">
                                    Middle Name
                                </label>
                                <div className="relative">
                                    <Input
                                        id="middlename"
                                        placeholder="Middle Name"
                                        className="pr-10"
                                        {...form.register('middlename')}
                                    />
                                    <UserIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <Input
                                        id="lastname"
                                        placeholder="Last Name"
                                        className="pr-10"
                                        {...form.register('lastname')}
                                    />
                                    <UserIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        className="pr-10"
                                        {...form.register('email')}
                                    />
                                    <MailIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    value={form.watch('status') ?? ''}
                                    onValueChange={(value) => form.setValue('status', value as IAdminValues['status'], { shouldValidate: true })}
                                >
                                    <SelectTrigger id="status" className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <RadioGroup
                                    value={form.watch('gender')}
                                    onValueChange={(value) => form.setValue('gender', value as IAdminValues['gender'], { shouldValidate: true })}
                                    className="flex space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="male" id="male" className="text-blue-600" />
                                        <label htmlFor="male" className="font-normal text-gray-900">Male</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="female" id="female" className="text-blue-600" />
                                        <label htmlFor="female" className="font-normal text-gray-900">Female</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="other" id="other" className="text-blue-600" />
                                        <label htmlFor="other" className="font-normal text-gray-900">Other</label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Marital Status <span className="text-red-500">*</span>
                                </label>
                                <RadioGroup
                                    value={form.watch('marital_status')}
                                    onValueChange={(value) => form.setValue('marital_status', value as IAdminValues['marital_status'], { shouldValidate: true })}
                                    className="flex space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="unmarried" id="unmarried" className="text-blue-600" />
                                        <label htmlFor="unmarried" className="font-normal text-gray-900">Unmarried</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="engaged" id="engaged" className="text-blue-600" />
                                        <label htmlFor="engaged" className="font-normal text-gray-900">Engaged</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="married" id="married" className="text-blue-600" />
                                        <label htmlFor="married" className="font-normal text-gray-900">Married</label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type="date"
                                        id="date_of_birth"
                                        className="pr-10"
                                        {...form.register('date_of_birth')}
                                    />
                                    <CalendarIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="date_of_joining" className="block text-sm font-medium text-gray-700">
                                    Date of Joining <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type="date"
                                        id="date_of_joining"
                                        className="pr-10"
                                        {...form.register('date_of_joining')}
                                    />
                                    <CalendarIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="last_working_date" className="block text-sm font-medium text-gray-700">
                                    Last Working Date
                                </label>
                                <div className="relative">
                                    <Input
                                        type="date"
                                        id="last_working_date"
                                        className="pr-10"
                                        {...form.register('last_working_date')}
                                    />
                                    <CalendarIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="probation_end_date" className="block text-sm font-medium text-gray-700">
                                    Probation End Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type="date"
                                        id="probation_end_date"
                                        className="pr-10"
                                        {...form.register('probation_end_date')}
                                    />
                                    <CalendarIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                                    Nationality <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="nationality"
                                        placeholder="Nationality"
                                        className="pr-10"
                                        {...form.register('nationality')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="blood_group" className="block text-sm font-medium text-gray-700">
                                    Blood Group
                                </label>
                                <Select
                                    value={form.watch('blood_group') ?? ''}
                                    onValueChange={(value) => form.setValue('blood_group', value as IAdminValues['blood_group'], { shouldValidate: true })}
                                >
                                    <SelectTrigger id="blood_group" className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                                        <SelectValue placeholder="Select blood group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-'].map(bg => (
                                            <SelectItem key={bg} value={bg}>{bg.toUpperCase()}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="pf_contribution"
                                    checked={form.watch('pf_contribution') === 1}
                                    onCheckedChange={(checked) => form.setValue('pf_contribution', checked ? 1 : 0, { shouldValidate: true })}
                                    className="data-[state=checked]:bg-blue-600"
                                />
                                <label htmlFor="pf_contribution" className="text-sm font-medium text-gray-700">
                                    PF Contribution <span className="text-red-500">*</span>
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="abry_contribution"
                                    checked={form.watch('abry_contribution') === 1}
                                    onCheckedChange={(checked) => form.setValue('abry_contribution', checked ? 1 : 0, { shouldValidate: true })}
                                    className="data-[state=checked]:bg-blue-600"
                                />
                                <label htmlFor="abry_contribution" className="text-sm font-medium text-gray-700">
                                    ABRY Contribution <span className="text-red-500">*</span>
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="esi_contribution"
                                    checked={form.watch('esi_contribution') === 1}
                                    onCheckedChange={(checked) => form.setValue('esi_contribution', checked ? 1 : 0, { shouldValidate: true })}
                                    className="data-[state=checked]:bg-blue-600"
                                />
                                <label htmlFor="esi_contribution" className="text-sm font-medium text-gray-700">
                                    ESI Contribution <span className="text-red-500">*</span>
                                </label>
                            </div>
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-200 my-4 max-w-[80vw] mx-auto" />

                    {/* Contact Details */}
                    <CardHeader className="my-5">
                        <CardTitle className="text-xl text-gray-800">Contact Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label htmlFor="residential" className="block text-sm font-medium text-gray-700">
                                    Residential Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="residential"
                                        placeholder="Residential Address"
                                        className="pr-10"
                                        {...form.register('residential')}
                                    />
                                    <MapPinIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="city"
                                        placeholder="City"
                                        className="pr-10"
                                        {...form.register('city')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="state"
                                        placeholder="State"
                                        className="pr-10"
                                        {...form.register('state')}
                                    />
                                    <MapPinIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="country"
                                        placeholder="Country"
                                        className="pr-10"
                                        {...form.register('country')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                                    Pincode <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="pincode"
                                        placeholder="Pincode"
                                        className="pr-10"
                                        {...form.register('pincode')}
                                    />
                                    <MapPinIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="contact_no" className="block text-sm font-medium text-gray-700">
                                    Contact Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="contact_no"
                                        placeholder="Contact Number"
                                        className="pr-10"
                                        {...form.register('contact_no')}
                                    />
                                    <PhoneIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="home" className="block text-sm font-medium text-gray-700">
                                    Home Contact No <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="home"
                                        placeholder="Home Contact Number"
                                        className="pr-10"
                                        {...form.register('home')}
                                    />
                                    <PhoneIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-200 my-4 max-w-[80vw] mx-auto" />

                    {/* Bank Details */}
                    <CardHeader className="my-5">
                        <CardTitle className="text-xl text-gray-800">Bank Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700">
                                    Bank Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="bank_name"
                                        placeholder="Bank Name"
                                        className="pr-10"
                                        {...form.register('bank_name')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="account_holder_name" className="block text-sm font-medium text-gray-700">
                                    Account Holder Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="account_holder_name"
                                        placeholder="Account Holder Name"
                                        className="pr-10"
                                        {...form.register('account_holder_name')}
                                    />
                                    <UserIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="account_no" className="block text-sm font-medium text-gray-700">
                                    Account Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="account_no"
                                        placeholder="Account Number"
                                        className="pr-10"
                                        {...form.register('account_no')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="branch_name" className="block text-sm font-medium text-gray-700">
                                    Branch Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="branch_name"
                                        placeholder="Branch Name"
                                        className="pr-10"
                                        {...form.register('branch_name')}
                                    />
                                    <MapPinIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="ifsc_code" className="block text-sm font-medium text-gray-700">
                                    IFSC Code <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="ifsc_code"
                                        placeholder="IFSC Code"
                                        className="pr-10"
                                        {...form.register('ifsc_code')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="account_type" className="block text-sm font-medium text-gray-700">
                                    Account Type <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="account_type"
                                        placeholder="Account Type"
                                        className="pr-10"
                                        {...form.register('account_type')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-200 my-4 max-w-[80vw] mx-auto" />

                    {/* Document Details */}
                    <CardHeader className="my-5">
                        <CardTitle className="text-xl text-gray-800">Document Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label htmlFor="aadhar_card" className="block text-sm font-medium text-gray-700">
                                    Aadhar Card Number
                                </label>
                                <div className="relative">
                                    <Input
                                        id="aadhar_card"
                                        placeholder="Aadhar Card Number"
                                        className="pr-10"
                                        {...form.register('aadhar_card')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="pan_card" className="block text-sm font-medium text-gray-700">
                                    PAN Card Number
                                </label>
                                <div className="relative">
                                    <Input
                                        id="pan_card"
                                        placeholder="PAN Card Number"
                                        className="pr-10"
                                        {...form.register('pan_card')}
                                    />
                                    <UserIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-200 my-4 max-w-[80vw] mx-auto" />

                    {/* Education Details */}
                    <CardHeader className="my-5">
                        <CardTitle className="text-xl text-gray-800">Education Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                                    Degree <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="degree"
                                        placeholder="Degree"
                                        className="pr-10"
                                        {...form.register('degree')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="college_name" className="block text-sm font-medium text-gray-700">
                                    College/University <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        id="college_name"
                                        placeholder="College/University"
                                        className="pr-10"
                                        {...form.register('college_name')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                                    Designation
                                </label>
                                <div className="relative">
                                    <Input
                                        id="designation"
                                        placeholder="Designation"
                                        className="pr-10"
                                        {...form.register('designation')}
                                    />
                                    <UserIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="start_month_year" className="block text-sm font-medium text-gray-700">
                                    Start Month/Year <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type="month"
                                        id="start_month_year"
                                        className="pr-10"
                                        {...form.register('start_month_year')}
                                    />
                                    <CalendarIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="end_month_year" className="block text-sm font-medium text-gray-700">
                                    End Month/Year <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type="month"
                                        id="end_month_year"
                                        className="pr-10"
                                        {...form.register('end_month_year')}
                                    />
                                    <CalendarIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-200 my-4 max-w-[80vw] mx-auto" />

                    {/* PF A/C, UAN & ESI Details */}
                    <CardHeader className="my-5">
                        <CardTitle className="text-xl text-gray-800">PF A/C, UAN & ESI Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label htmlFor="pf_account_no" className="block text-sm font-medium text-gray-700">
                                    PF Account Number
                                </label>
                                <div className="relative">
                                    <Input
                                        id="pf_account_no"
                                        placeholder="PF Account Number"
                                        className="pr-10"
                                        {...form.register('pf_account_no')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="uan_no" className="block text-sm font-medium text-gray-700">
                                    UAN Number
                                </label>
                                <div className="relative">
                                    <Input
                                        id="uan_no"
                                        placeholder="UAN Number"
                                        className="pr-10"
                                        {...form.register('uan_no')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="esi_no" className="block text-sm font-medium text-gray-700">
                                    ESI Number
                                </label>
                                <div className="relative">
                                    <Input
                                        id="esi_no"
                                        placeholder="ESI Number"
                                        className="pr-10"
                                        {...form.register('esi_no')}
                                    />
                                    <GlobeIcon className="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <Separator className="bg-gray-200 my-4 max-w-[80vw] mx-auto" />

                    <CardFooter className="flex justify-end space-x-2 mt-4">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
                        >
                            {form.formState.isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}