"use client";

import { useState, ChangeEvent } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
    Card, CardHeader, CardContent, CardFooter, CardDescription,
} from "@/components/ui/card";
import { Form, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/ui/icon-Input";
import { CircleHelpIcon, LucideUploadCloud } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DialogClose, DialogTitle
} from "@/components/ui/dialog";
import {
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { ICompanyDataValues, ICompanyValues } from '@/types/company';

export function CompanyEditDialog({
    comp_data,
    onSubmitCompany,
}: {
    comp_data: ICompanyValues
    onSubmitCompany: (id: number, data: FormData) => void;
}) {
    const [logoPreview, setLogoPreview] = useState<string>(comp_data.logo_url);

    const form = useForm<ICompanyDataValues>({
        defaultValues: {
            company_name: comp_data.name,
            email: comp_data.email,
            contact_no: comp_data.contact_no,
            city: comp_data.city,
            state: comp_data.state,
            country: comp_data.country,
            pincode: comp_data.pincode,
            address: comp_data.address,
            logo: comp_data.logo_url,
            file_size_limit: comp_data.file_size_limit,
            location_range: comp_data.location_range,
            allowed_location_points: (
                comp_data.allowed_location_points ?? []
            ).length > 0
                ? comp_data.allowed_location_points!
                : [{ latitude: "", longitude: "" }],
        },
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "allowed_location_points",
    });

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = (data: ICompanyDataValues) => {

        const formData = new FormData();

        // 1) Append basic scalar fields:
        formData.append("company_name", data.company_name);
        formData.append("email", data.email);
        formData.append("contact_no", data.contact_no);
        formData.append("city", data.city);
        formData.append("state", data.state);
        formData.append("country", data.country);
        formData.append("pincode", String(data.pincode));
        formData.append("address", data.address);
        if (data.file_size_limit != null) {
            formData.append("file_size_limit", String(data.file_size_limit));
        }
        if (data.location_range != null) {
            formData.append("location_range", String(data.location_range));
        }

        if (data.logo instanceof File) {
            formData.append("logo", data.logo);
        }

        data.allowed_location_points?.forEach((pt, idx) => {
            formData.append(`allowed_location_points[${idx}][latitude]`, pt.latitude);
            formData.append(`allowed_location_points[${idx}][longitude]`, pt.longitude);
        });

        onSubmitCompany(comp_data.id, formData);

    };

    return (
        <Card className="shadow-none border-0 m-0 p-0">
            <CardHeader className="space-y-2 pb-2">
                <div className="flex flex-col items-center space-y-4">
                    <label htmlFor="logo" className="relative group cursor-pointer">
                        <Avatar className="h-24 w-24 border-2 border-dashed border-gray-200 hover:border-primary">
                            {logoPreview ? (
                                <AvatarImage src={logoPreview} className="object-cover" />
                            ) : (
                                <AvatarFallback className="bg-gray-100">
                                    <LucideUploadCloud className="h-8 w-8 text-gray-400 group-hover:text-primary" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                            <p className="text-white text-sm">Change Logo</p>
                        </div>
                    </label>
                    <div className="text-center">
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            Edit Company Profile
                        </DialogTitle>
                        <CardDescription className="text-gray-600">
                            Update your organization&apos;s information and settings
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <Separator className="bg-gray-500/50" />

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6">
                        {/* Company Details */}
                        <FormControl>
                            <IconInput
                                id="company_name"
                                label="Company Name"
                                placeholder="Acme Inc."
                                className="focus:ring-2 focus:ring-primary"
                                {...register("company_name")}
                            />
                        </FormControl>

                        <FormControl>
                            <IconInput
                                id="email"
                                label="Email"
                                type="email"
                                placeholder="contact@acme.com"
                                {...register("email")}
                            />
                        </FormControl>

                        <FormControl>
                            <IconInput
                                id="contact_no"
                                label="Contact Number"
                                type="tel"
                                placeholder="+1 555 000 0000"
                                {...register("contact_no")}
                            />
                        </FormControl>

                        <Separator className="my-4" />

                        {/* Address Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormControl>
                                <IconInput
                                    id="address"
                                    label="Street Address"
                                    placeholder="123 Main Street"
                                    {...register("address")}
                                />
                            </FormControl>
                            <FormControl>
                                <IconInput
                                    id="city"
                                    label="City"
                                    placeholder="New York"
                                    {...register("city")}
                                />
                            </FormControl>
                            <FormControl>
                                <IconInput
                                    id="state"
                                    label="State/Province"
                                    placeholder="NY"
                                    {...register("state")}
                                />
                            </FormControl>
                            <FormControl>
                                <IconInput
                                    id="country"
                                    label="Country"
                                    placeholder="United States"
                                    {...register("country")}
                                />
                            </FormControl>
                            <FormControl>
                                <IconInput
                                    id="pincode"
                                    label="ZIP/Postal Code"
                                    placeholder="10001"
                                    {...register("pincode")}
                                />
                            </FormControl>
                        </div>

                        <Separator className="my-4" />

                        {/* Settings */}
                        <FormControl>
                            <IconInput
                                id="file_size_limit"
                                label="File Size Limit (bytes)"
                                placeholder="Enter size in bytes"
                                type="number"
                                {...register("file_size_limit")}
                            />
                        </FormControl>

                        <FormControl>
                            <IconInput
                                id="location_range"
                                label={
                                    <div className="flex items-center gap-2">
                                        Location Radius
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CircleHelpIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-[300px]">
                                                    <p className="text-sm">
                                                        The radius (in meters) within which attendance
                                                        locations are considered valid.
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                }
                                placeholder="e.g., 500"
                                type="number"
                                {...register("location_range")}
                            />
                        </FormControl>

                        {/* Hidden file input for logo */}
                        <FormControl>
                            <Input
                                id="logo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                {...register("logo")}
                                onChange={handleLogoChange}
                            />
                        </FormControl>

                        {/* Dynamic Allowed Location Points */}
                        <div>
                            <Label className="font-medium">Allowed Location Points</Label>
                            {fields.map((field, idx) => (
                                <div key={field.id} className="flex gap-2 items-end mb-2">
                                    <Controller
                                        control={control}
                                        name={`allowed_location_points.${idx}.latitude`}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Enter latitude..."
                                                className="flex-1"
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`allowed_location_points.${idx}.longitude`}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Enter longitude..."
                                                className="flex-1"
                                            />
                                        )}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => remove(idx)}
                                        aria-label="Remove location"
                                    >
                                        &times;
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => append({ latitude: "", longitude: "" })}
                            >
                                Add Point
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end gap-3 p-6 bg-gray-50 rounded-b-xl">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="px-6 rounded-full"
                                disabled={isSubmitting}
                            >
                                Discard Changes
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="px-6 rounded-full bg-primary hover:bg-primary-dark"
                            disabled={isSubmitting}
                            loading={isSubmitting}
                        >
                            Save Changes
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}