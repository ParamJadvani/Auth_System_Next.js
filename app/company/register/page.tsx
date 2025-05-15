"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import useCompany from "@/hooks/use-Company";
import {
    Card, CardHeader, CardTitle, CardDescription,
    CardContent, CardFooter
} from "@/components/ui/card";
import { Form, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconInput } from "@/components/ui/iconInput";
import {
    Building2, Mail, Phone, MapPin, Landmark,
    Globe, Hash, MapIcon, LucideUploadCloud
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import  useAuth  from '@/hooks/use-Auth';
import { toast } from 'react-toastify';
import { ICompanyDataValues } from '@/types/company';

export default function CompanyRegisterPage() {
    const [logoPreview, setLogoPreview] = useState<string>();

    const form = useForm<ICompanyDataValues>({
        defaultValues: {
            company_name: "",
            email: "",
            contact_no: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            address: "",
            logo: undefined,
        },
    });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const { registerCompany } = useCompany();
    const { logout: logoutCompany } = useAuth();

    const onSubmit = async (data: ICompanyDataValues) => {
        await registerCompany(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Company Registration</CardTitle>
                    <CardDescription>Fill in your company details below</CardDescription>
                </CardHeader>

                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormControl>
                                <IconInput
                                    id="company_name"
                                    label="Company Name"
                                    placeholder='company name...'
                                    icon={Building2}
                                    {...register("company_name")}
                                />
                            </FormControl>

                            <FormControl>
                                <IconInput
                                    id="email"
                                    label="Email"
                                    type="email"
                                    placeholder='email address...'
                                    icon={Mail}
                                    {...register("email")}
                                />
                            </FormControl>

                            <FormControl>
                                <IconInput
                                    id="contact_no"
                                    label="Contact Number"
                                    placeholder='contact number...'
                                    type="tel"
                                    icon={Phone}
                                    {...register("contact_no")}
                                />
                            </FormControl>

                            <div className="grid grid-cols-2 gap-4">
                                <FormControl>
                                    <IconInput
                                        id="city"
                                        label="City"
                                        placeholder='city...'
                                        icon={MapPin}
                                        {...register("city")}
                                    />
                                </FormControl>
                                <FormControl>
                                    <IconInput
                                        id="state"
                                        label="State"
                                        placeholder='state...'
                                        icon={Landmark}
                                        {...register("state")}
                                    />
                                </FormControl>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormControl>
                                    <IconInput
                                        id="country"
                                        label="Country"
                                        placeholder='country...'
                                        icon={Globe}
                                        {...register("country")}
                                    />
                                </FormControl>
                                <FormControl>
                                    <IconInput
                                        id="pincode"
                                        label="Pincode"
                                        placeholder='pincode...'
                                        icon={Hash}
                                        {...register("pincode")}
                                    />
                                </FormControl>
                            </div>

                            <FormControl>
                                <IconInput
                                    id="address"
                                    label="Address"
                                    placeholder='address...'
                                    icon={MapIcon}
                                    {...register("address")}
                                />
                            </FormControl>

                            {/* Logo Upload */}
                            <FormControl>
                                <div>
                                    <label htmlFor="logo" className="block mb-1 font-medium">
                                        Company Logo
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-16 w-16">
                                            {logoPreview ? (
                                                <AvatarImage src={logoPreview} alt="Logo Preview" />
                                            ) : (
                                                <AvatarFallback>
                                                    <LucideUploadCloud className="h-8 w-8 text-gray-400" />
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                        <Input
                                            id="logo"
                                            type="file"
                                            accept="image/*"
                                            placeholder='company logo...'
                                            {...register("logo")}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) setLogoPreview(URL.createObjectURL(file));
                                            }}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-2 mt-4">
                            <Button type="submit" disabled={isSubmitting} className="w-full rounded-full flex items-center justify-center hover:border-transparent font-medium text-sm sm:text-base h-8 sm:h-10 px-4 sm:px-5">
                                {isSubmitting ? "Submitting..." : "Register Company"}
                            </Button>
                            <Button
                                variant="outline"
                                type="button"
                                onClick={async () => {
                                    await logoutCompany()
                                    toast.success("Logout Successful");
                                }}
                                className="rounded-full flex items-center justify-center font-medium text-sm sm:text-base h-8 sm:h-10 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] mt-2"
                            >
                                Logout
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}