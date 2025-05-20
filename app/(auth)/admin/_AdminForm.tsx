import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import {
    Calendar as CalendarIcon,
    User as UserIcon,
    Mail as MailIcon,
    Globe as GlobeIcon,
    Lock as LockIcon,
    Phone as PhoneIcon,
    MapPin as MapPinIcon,
} from "lucide-react";
import { IconInput } from "@/components/ui/icon-Input";
import { IAdminValues, ICreateAdminValues, IUpdateAdminValues } from '@/types/admin';
import { accountType, bloodGroupList, contributionList, genderList, maritalStatusList, processDate, statusList } from '@/helper/helper';
import { Label } from '@/components/ui/label';
import { DialogClose } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';


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
            };
        }
        return {} as ICreateAdminValues | IUpdateAdminValues;
    };

    const form = useForm<ICreateAdminValues | IUpdateAdminValues>({
        defaultValues: getDefaultValues(),
    });
    const router = useRouter();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card className='shadow-none border-0'>
                    <CardHeader>
                        <CardTitle>Basic Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FormControl>
                                <IconInput label="First Name" id="firstname" icon={UserIcon} {...form.register("firstname")} />
                            </FormControl>
                            <FormControl>
                                <IconInput label="Middle Name" id="middlename" icon={UserIcon} {...form.register("middlename")} />
                            </FormControl>
                            <FormControl>
                                <IconInput label="Last Name" id="lastname" icon={UserIcon} {...form.register("lastname")} />
                            </FormControl>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FormControl>
                                <IconInput label="Nationality" id="nationality" icon={GlobeIcon} {...form.register("nationality")} />
                            </FormControl>
                            <FormControl>
                                <IconInput label="Email" id="email" type="email" icon={MailIcon} {...form.register("email")} />
                            </FormControl>
                            {!isEditing && (
                                <FormControl>
                                    <IconInput label="Password" id="password" type="password" icon={LockIcon} {...form.register("password")} />
                                </FormControl>
                            )}
                        </div>
                        {/* Row 3: gender, marital_status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <Label className="block text-sm font-medium">
                                    Gender <span className="text-destructive">*</span>
                                </Label>
                                <RadioGroup
                                    value={form.watch("gender")}
                                    onValueChange={(value) =>
                                        form.setValue("gender", value as IAdminValues["gender"])
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
                                <Label className="block text-sm font-medium">
                                    Marital Status <span className="text-destructive">*</span>
                                </Label>
                                <RadioGroup
                                    value={form.watch("marital_status")}
                                    onValueChange={(value) =>
                                        form.setValue("marital_status", value as IAdminValues["marital_status"])
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FormControl>
                                <IconInput label="Date of Birth" id="date_of_birth" type="date" icon={CalendarIcon} {...form.register("date_of_birth")} />
                            </FormControl>
                            <FormControl>
                                <IconInput label="Date of Joining" id="date_of_joining" type="date" icon={CalendarIcon} {...form.register("date_of_joining")} />
                            </FormControl>
                            <FormControl>
                                <IconInput label="Probation End Date" id="probation_end_date" type="date" icon={CalendarIcon} {...form.register("probation_end_date")} />
                            </FormControl>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label htmlFor="status" className="block text-sm font-medium">
                                    Status <span className="text-destructive">*</span>
                                </label>
                                <Select
                                    value={form.watch("status")}
                                    onValueChange={(value) =>
                                        form.setValue("status", value as IAdminValues["status"])
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
                            <FormControl>
                                <IconInput label="Last Working Date" id="last_working_date" type="date" icon={CalendarIcon} {...form.register("last_working_date")} />
                            </FormControl>
                            <div>
                                <Label className="block text-sm font-medium">Blood Group</Label>
                                <Select
                                    value={form.watch("blood_group") ?? ""}
                                    onValueChange={(value) =>
                                        form.setValue("blood_group", value as IAdminValues["blood_group"])
                                    }
                                >
                                    <SelectTrigger>
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
                        <div className="flex flex-wrap gap-4">
                            {contributionList.map((name) => (
                                <div key={name} className="flex items-center w-full sm:w-[48%] lg:w-[32%] bg-muted/30 rounded-md px-4 py-2">
                                    <Label className="capitalize mr-auto text-sm font-medium">
                                        {name.split("_")[0].toUpperCase()} Contribution
                                    </Label>
                                    <Switch
                                        checked={form.watch(name) === 1}
                                        onCheckedChange={(checked) => form.setValue(name, checked ? 1 : 0)}
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Sections for Edit Mode */}
                {isEditing && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl>
                                        <IconInput label="Residential Address" id="residential" icon={MapPinIcon} {...form.register("residential")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="City" id="city" icon={GlobeIcon} {...form.register("city")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="State" id="state" icon={MapPinIcon} {...form.register("state")} />
                                    </FormControl>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl>
                                        <IconInput label="Country" id="country" icon={GlobeIcon} {...form.register("country")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="Pincode" id="pincode" type="number" icon={MapPinIcon} {...form.register("pincode")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="Personal Contact" id="personal" type="number" icon={PhoneIcon} {...form.register("personal")} />
                                    </FormControl>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl>
                                        <IconInput label="Home Contact" id="home" type="number" icon={PhoneIcon} {...form.register("home")} />
                                    </FormControl>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Bank Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl>
                                        <IconInput label="Bank Name" id="bank_name" icon={GlobeIcon} {...form.register("bank_name")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="Account Holder Name" id="account_holder_name" icon={UserIcon} {...form.register("account_holder_name")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="Account Number" id="account_no" type="number" icon={GlobeIcon} {...form.register("account_no")} />
                                    </FormControl>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl>
                                        <IconInput label="Branch Name" id="branch_name" icon={MapPinIcon} {...form.register("branch_name")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="IFSC Code" id="ifsc_code" icon={GlobeIcon} {...form.register("ifsc_code")} />
                                    </FormControl>
                                    <div>
                                        <Label className="block text-sm font-medium">Account Type</Label>
                                        <Select
                                            value={form.watch("account_type")}
                                            onValueChange={(value) => form.setValue("account_type", value)}
                                        >
                                            <SelectTrigger>
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
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Document Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl>
                                        <IconInput label="Aadhar Card Number" id="aadhar_card" icon={GlobeIcon} {...form.register("aadhar_card")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="PAN Card Number" id="pan_card" icon={UserIcon} {...form.register("pan_card")} />
                                    </FormControl>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Education Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl>
                                        <IconInput label="Degree" id="degree" icon={GlobeIcon} {...form.register("degree")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="College/University" id="college_name" icon={GlobeIcon} {...form.register("college_name")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="Designation" id="designation" icon={UserIcon} {...form.register("designation")} />
                                    </FormControl>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl>
                                        <IconInput label="Start Month/Year" id="start_month_year" type="month" icon={CalendarIcon} {...form.register("start_month_year")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="End Month/Year" id="end_month_year" type="month" icon={CalendarIcon} {...form.register("end_month_year")} />
                                    </FormControl>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>PF A/C, UAN & ESI Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormControl>
                                        <IconInput label="PF Account Number" id="pf_account_no" icon={GlobeIcon} {...form.register("pf_account_no")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="UAN Number" id="uan_no" icon={GlobeIcon} {...form.register("uan_no")} />
                                    </FormControl>
                                    <FormControl>
                                        <IconInput label="ESI Number" id="esi_no" icon={GlobeIcon} {...form.register("esi_no")} />
                                    </FormControl>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                <div className="flex justify-end items-center  space-x-2 fixed bottom-1 z-50 right- ">
                    {!isEditing ?
                        (
                            <DialogClose>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                        )
                        : (
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                Cancel
                            </Button>
                        )
                    }
                    <Button type="submit" disabled={form.formState.isSubmitting} loading={form.formState.isSubmitting}>
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
}