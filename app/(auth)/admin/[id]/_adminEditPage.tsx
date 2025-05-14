"use client";
import { updateAdminSchema, UpdateAdminValues } from '@/lib/validations/admin';
import { Admin } from '@/types/admin';
import { zodResolver } from '@hookform/resolvers/zod';
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
    GlobeIcon,
    Phone as PhoneIcon,
    MapPin as MapPinIcon,
} from "lucide-react";
import { IconInput } from "@/components/ui/iconInput";
import { Separator } from '@/components/ui/separator';
import { ComponentType, SVGProps } from 'react';
import useAdmin from '@/hooks/useAdmin';

// Centralized field configuration
const fieldConfig = {
    basicDetails: [
        {
            fields: [
                { name: 'firstname', label: 'First Name', placeholder: 'First Name', icon: UserIcon },
                { name: 'middlename', label: 'Middle Name', placeholder: 'Middle Name', icon: UserIcon, nullable: true },
                { name: 'lastname', label: 'Last Name', placeholder: 'Last Name', icon: UserIcon, nullable: true },
            ],
        },
        {
            fields: [
                { name: 'email', label: 'Email', placeholder: 'Email', icon: MailIcon, type: 'email' },
                {
                    name: 'status',
                    label: 'Status',
                    type: 'select',
                    required: true,
                    options: [
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                    ],
                },
                {
                    name: 'gender',
                    label: 'Gender',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' },
                    ],
                },
            ],
        },
        {
            fields: [
                {
                    name: 'marital_status',
                    label: 'Marital Status',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'unmarried', label: 'Unmarried' },
                        { value: 'engaged', label: 'Engaged' },
                        { value: 'married', label: 'Married' },
                    ],
                },
                { name: 'date_of_birth', label: 'Date of Birth', type: 'date', icon: CalendarIcon },
                { name: 'date_of_joining', label: 'Date of Joining', type: 'date', icon: CalendarIcon },
            ],
        },
        {
            fields: [
                { name: 'last_working_date', label: 'Last Working Date', type: 'date', icon: CalendarIcon, nullable: true },
                { name: 'probation_end_date', label: 'Probation End Date', type: 'date', icon: CalendarIcon },
                { name: 'nationality', label: 'Nationality', placeholder: 'Nationality', icon: GlobeIcon },
            ],
        },
        {
            fields: [
                {
                    name: 'blood_group',
                    label: 'Blood Group',
                    type: 'select',
                    options: ['a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-'].map(bg => ({
                        value: bg,
                        label: bg.toUpperCase(),
                    })),
                    nullable: true,
                },
            ],
        },
        {
            fields: [
                { name: 'pf_contribution', label: 'PF Contribution', type: 'switch', required: true },
                { name: 'abry_contribution', label: 'ABRY Contribution', type: 'switch', required: true },
                { name: 'esi_contribution', label: 'ESI Contribution', type: 'switch', required: true },
            ],
        },
    ],
    contactDetails: [
        {
            fields: [
                { name: 'residential', label: 'Residential Address', placeholder: 'Residential Address', icon: MapPinIcon },
                { name: 'city', label: 'City', placeholder: 'City', icon: GlobeIcon },
                { name: 'state', label: 'State', placeholder: 'State', icon: MapPinIcon },
            ],
        },
        {
            fields: [
                { name: 'country', label: 'Country', placeholder: 'Country', icon: GlobeIcon },
                { name: 'pincode', label: 'Pincode', placeholder: 'Pincode', icon: MapPinIcon },
                { name: 'contact_no', label: 'Contact Number', placeholder: 'Contact Number', icon: PhoneIcon },
            ],
        },
        {
            fields: [
                { name: 'home', label: 'Home Contact No', placeholder: 'Home Contact Number', icon: PhoneIcon },
            ],
        },
    ],
    bankDetails: [
        {
            fields: [
                { name: 'bank_name', label: 'Bank Name', placeholder: 'Bank Name', icon: GlobeIcon },
                { name: 'account_holder_name', label: 'Account Holder Name', placeholder: 'Account Holder Name', icon: UserIcon },
                { name: 'account_no', label: 'Account Number', placeholder: 'Account Number', icon: GlobeIcon },
            ],
        },
        {
            fields: [
                { name: 'branch_name', label: 'Branch Name', placeholder: 'Branch Name', icon: MapPinIcon },
                { name: 'ifsc_code', label: 'IFSC Code', placeholder: 'IFSC Code', icon: GlobeIcon },
                { name: 'account_type', label: 'Account Type', placeholder: 'Account Type', icon: GlobeIcon },
            ],
        },
    ],
    documentDetails: [
        {
            fields: [
                { name: 'aadhar_card', label: 'Aadhar Card Number', placeholder: 'Aadhar Card Number', icon: GlobeIcon, nullable: true },
                { name: 'pan_card', label: 'PAN Card Number', placeholder: 'PAN Card Number', icon: UserIcon, nullable: true },
            ],
        },
    ],
    educationDetails: [
        {
            fields: [
                { name: 'degree', label: 'Degree', placeholder: 'Degree', icon: GlobeIcon },
                { name: 'college_name', label: 'College/University', placeholder: 'College/University', icon: GlobeIcon },
                { name: 'designation', label: 'Designation', placeholder: 'Designation', icon: UserIcon, nullable: true },
            ],
        },
        {
            fields: [
                { name: 'start_month_year', label: 'Start Month/Year', type: 'month', icon: CalendarIcon },
                { name: 'end_month_year', label: 'End Month/Year', type: 'month', icon: CalendarIcon },
            ],
        },
    ],
    pfUanEsiDetails: [
        {
            fields: [
                { name: 'pf_account_no', label: 'PF Account Number', placeholder: 'PF Account Number', icon: GlobeIcon, nullable: true },
                { name: 'uan_no', label: 'UAN Number', placeholder: 'UAN Number', icon: GlobeIcon, nullable: true },
                { name: 'esi_no', label: 'ESI Number', placeholder: 'ESI Number', icon: GlobeIcon, nullable: true },
            ],
        },
    ],
};

// Reusable Grid Container
const GridContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
);

// Reusable Form Field Wrapper
interface FormFieldWrapperProps {
    form: any;
    field: {
        name: string;
        label: string;
        placeholder?: string;
        icon?: ComponentType<SVGProps<SVGSVGElement>>;
        type?: string;
        options?: { value: string; label: string }[];
        required?: boolean;
        nullable?: boolean;
    };
}

const FormFieldWrapper = ({ form, field }: FormFieldWrapperProps) => {
    const { name, label, placeholder, icon, type = 'text', options, required, nullable } = field;

    if (type === 'select') {
        return (
            <div className="space-y-1">
                <label htmlFor={name} className="block text-sm font-medium">
                    {label} {required && <span className="text-destructive">*</span>}
                </label>
                <Select
                    value={form.watch(name) ?? (nullable ? '' : undefined)}
                    onValueChange={(value) =>
                        form.setValue(name, value, { shouldValidate: true })
                    }
                >
                    <SelectTrigger id={name}>
                        <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {options?.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    }

    if (type === 'radio') {
        return (
            <div className="space-y-1">
                <label className="block text-sm font-medium">
                    {label} {required && <span className="text-destructive">*</span>}
                </label>
                <RadioGroup
                    value={form.watch(name)}
                    onValueChange={(value) =>
                        form.setValue(name, value, { shouldValidate: true })
                    }
                    className="flex space-x-4"
                >
                    {options?.map(option => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <label htmlFor={option.value} className="font-normal">{option.label}</label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        );
    }

    if (type === 'switch') {
        return (
            <div className="flex items-center w-full sm:w-[48%] lg:w-[45%] bg-muted/30 rounded-md px-4 py-2">
                <label className="capitalize mr-auto text-sm font-medium">
                    {label} {required && <span className="text-destructive">*</span>}
                </label>
                <Switch
                    checked={form.watch(name) === 1}
                    onCheckedChange={(checked) =>
                        form.setValue(name, checked ? 1 : 0, { shouldValidate: true })
                    }
                />
            </div>
        );
    }

    return (
        <FormControl className="space-y-1">
            <IconInput
                label={label}
                id={name}
                placeholder={placeholder}
                icon={icon}
                type={type}
                {...form.register(name)}
            />
        </FormControl>
    );
};

// Main Form Component
export function AdminEditForm({ data }: { data: Admin }) {
    const form = useForm<UpdateAdminValues>({
        resolver: zodResolver(updateAdminSchema),
        defaultValues: {
            firstname: data.firstname || "",
            lastname: data.lastname || null,
            middlename: data.middlename || null,
            email: data.email || "",
            date_of_birth: data.date_of_birth || "",
            gender: data.gender || "male",
            nationality: data.nationality || "",
            marital_status: data.marital_status || "unmarried",
            blood_group: data.blood_group || null,
            date_of_joining: data.date_of_joining || "",
            probation_end_date: data.probation_end_date || "",
            status: data.status || "active",
            pf_contribution: data.pf_contribution || 0,
            abry_contribution: data.abry_contribution || 0,
            esi_contribution: data.esi_contribution || 0,
            last_working_date: data.last_working_date || null,
            id: data.id || 0,
            company_id: data.company_id || 0,
            email_verified_at: data.email_verified_at || null,
            contact_no: data.contact_no || "",
            address: data.address || null,
            aadhar_card: data.aadhar_card || null,
            pan_card: data.pan_card || null,
            pf_account_no: data.pf_account_no || null,
            uan_no: data.uan_no || null,
            esi_no: data.esi_no || null,
            designation: data.designation || null,
            employee_id: data.employee_id || null,
            education_info: data.education_info || null,
            bank_info: data.bank_info || null,
            salary_contract_period: data.salary_contract_period || null,
            salary_increment_date: data.salary_increment_date || null,
            next_increment_date: data.next_increment_date || null,
            hold_percentage: data.hold_percentage || null,
            hold_paid_at: data.hold_paid_at || null,
            file_size_limit: data.file_size_limit || 0,
            used_size: data.used_size || 0,
            is_admin: data.is_admin || 0,
            is_super_admin: data.is_super_admin || 0,
            two_factor_secret: data.two_factor_secret || null,
            remember_me_token: data.remember_me_token || null,
            created_at: data.created_at || "",
            updated_at: data.updated_at || "",
            deleted_at: data.deleted_at || null,
            account_holder_name: null,
            account_no: null,
            account_type: null,
            bank_name: null,
            branch_name: null,
            city: null,
            college_name: null,
            country: null,
            degree: null,
            end_month_year: null,
            home: null,
            ifsc_code: null,
            personal: null,
            pincode: null,
            residential: null,
            start_month_year: null,
            state: null,
        },
    });

    const updateAdmin = useAdmin().updateAdmin;

    const onSubmit = async (data: UpdateAdminValues) => {
        updateAdmin(data.id, data);
    };

    const renderSection = (section: keyof typeof fieldConfig, title: string) => (
        <>
            <CardHeader className='my-5'>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                {fieldConfig[section].map((group, index) => (
                    <GridContainer key={index}>
                        {group.fields.map(field => (
                            <FormFieldWrapper key={field.name} form={form} field={field} />
                        ))}
                    </GridContainer>
                ))}
            </CardContent>
            <Separator className="bg-gray-500/50 my-4 max-w-[80vw] mx-auto" />
        </>
    );

    return (
        <Card className="border-0 shadow-none">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {renderSection('basicDetails', 'Basic Details')}
                    {renderSection('contactDetails', 'Contact Details')}
                    {renderSection('bankDetails', 'Bank Details')}
                    {renderSection('documentDetails', 'Document Details')}
                    {renderSection('educationDetails', 'Education Details')}
                    {renderSection('pfUanEsiDetails', 'PF A/C, UAN & ESI Details')}
                    <CardFooter className="flex justify-end space-x-2 mt-4">
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}