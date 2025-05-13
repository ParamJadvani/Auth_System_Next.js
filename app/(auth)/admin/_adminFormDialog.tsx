'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

import { createAdminSchema, CreateAdminValues } from '@/lib/validations/admin';
import { Switch } from '@/components/ui/switch';


export default function AdminFormDialog() {
    const [open, setOpen] = useState(false);

    const form = useForm<CreateAdminValues>({
        resolver: zodResolver(createAdminSchema),
        defaultValues: {
            firstname: '',
            middlename: '',
            lastname: '',
            nationality: '',
            email: '',
            password: '',
            gender: 'male',
            marital_status: 'unmarried',
            blood_group: '',
            date_of_birth: '',
            date_of_joining: '',
            probation_end_date: '',
            status: 'active',
            last_working_date: '',
            pf_contribution: 0,
            abry_contribution: 0,
            esi_contribution: 0,
        },
    });

    const {
        handleSubmit,
        control,
        register,
        formState: { errors, isSubmitting },
    } = form;

    const onSubmit = (data: CreateAdminValues) => {
        console.log('Create Admin payload:', data);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create New Admin</Button>
            </DialogTrigger>

            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create Admin</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                        {/* Name Row */}
                        <div className="grid grid-cols-3 gap-4">
                            <FormControl>
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <Input {...register('firstname')} placeholder="First Name" />
                                    <FormMessage>{errors.firstname?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                            <FormControl>
                                <FormItem>
                                    <FormLabel>Middle Name</FormLabel>
                                    <Input {...register('middlename')} placeholder="Middle Name" />
                                    <FormMessage>{errors.middlename?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                            <FormControl>
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input {...register('lastname')} placeholder="Last Name" />
                                    <FormMessage>{errors.lastname?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                        </div>

                        {/* Nationality / Email / Password */}
                        <div className="grid grid-cols-3 gap-4">
                            <FormControl>
                                <FormItem>
                                    <FormLabel>Nationality</FormLabel>
                                    <Input {...register('nationality')} placeholder="Nationality" />
                                    <FormMessage>{errors.nationality?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                            <FormControl>
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" {...register('email')} placeholder="you@example.com" />
                                    <FormMessage>{errors.email?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                            <FormControl>
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" {...register('password')} placeholder="••••••••" />
                                    <FormMessage>{errors.password?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                        </div>

                        {/* Gender Checkboxes */}
                        <FormControl>
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <div className="flex space-x-4">
                                    {(['male', 'female', 'other'] as const).map((g) => (
                                        <label key={g} className="flex items-center space-x-1">
                                            <input
                                                type="radio"
                                                value={g}
                                                {...register('gender')}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                            />
                                            <span className="capitalize">{g}</span>
                                        </label>
                                    ))}
                                </div>
                                <FormMessage>{errors.gender && 'Select at least one'}</FormMessage>
                            </FormItem>
                        </FormControl>

                        {/* Marital Status Checkboxes */}
                        {/* Marital Status Radio Buttons */}
                        <FormControl>
                            <FormItem>
                                <FormLabel>Marital Status</FormLabel>
                                <div className="flex space-x-4">
                                    {(['unmarried', 'engaged', 'married'] as const).map((s) => (
                                        <label key={s} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                value={s}
                                                {...register('marital_status')}
                                                className="h-4 w-4 text-blue-600 border-gray-300"
                                            />
                                            <span className="capitalize">{s}</span>
                                        </label>
                                    ))}
                                </div>
                                <FormMessage>{errors.marital_status?.message}</FormMessage>
                            </FormItem>
                        </FormControl>


                        {/* Dates Row */}
                        <div className="grid grid-cols-3 gap-4">
                            <FormControl>
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <Input type="date" {...register('date_of_birth')} />
                                    <FormMessage>{errors.date_of_birth?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                            <FormControl>
                                <FormItem>
                                    <FormLabel>Date of Joining</FormLabel>
                                    <Input type="date" {...register('date_of_joining')} />
                                    <FormMessage>{errors.date_of_joining?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                            <FormControl>
                                <FormItem>
                                    <FormLabel>Probation End</FormLabel>
                                    <Input type="date" {...register('probation_end_date')} />
                                    <FormMessage>{errors.probation_end_date?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                        </div>

                        {/* Blood Group Select & Status */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormControl>
                                <FormItem>
                                    <FormLabel>Blood Group</FormLabel>
                                    <Controller
                                        control={control}
                                        name="blood_group"
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select group" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'].map((bg) => (
                                                        <SelectItem key={bg} value={bg.toLowerCase()}>
                                                            {bg}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <FormMessage>{errors.blood_group?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                            <FormControl>
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Controller
                                        control={control}
                                        name="status"
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="inactive">Inactive</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <FormMessage>{errors.status?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                        </div>

                        {/* Last Working and Contributions */}
                        {/* Last Working and Contributions */}
                        <div className="grid grid-cols-4 gap-4">
                            <FormControl>
                                <FormItem>
                                    <FormLabel>Last Working Date</FormLabel>
                                    <Input type="date" {...register('last_working_date')} />
                                    <FormMessage>{errors.last_working_date?.message}</FormMessage>
                                </FormItem>
                            </FormControl>

                            <FormControl>
                                <FormItem>
                                    <FormLabel>PF Contribution</FormLabel>
                                    <Controller
                                        control={control}
                                        name="pf_contribution"
                                        render={({ field: { value, onChange } }) => (
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={Boolean(value)}
                                                    onCheckedChange={(checked) => onChange(checked ? 1 : 0)}
                                                />
                                                <span className="text-sm text-muted-foreground">{value ? 'Enabled' : 'Disabled'}</span>
                                            </div>
                                        )}
                                    />
                                    <FormMessage>{errors.pf_contribution?.message}</FormMessage>
                                </FormItem>
                            </FormControl>

                            <FormControl>
                                <FormItem>
                                    <FormLabel>ABRY Contribution</FormLabel>
                                    <Controller
                                        control={control}
                                        name="abry_contribution"
                                        render={({ field: { value, onChange } }) => (
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={Boolean(value)}
                                                    onCheckedChange={(checked) => onChange(checked ? 1 : 0)}
                                                />
                                                <span className="text-sm text-muted-foreground">{value ? 'Enabled' : 'Disabled'}</span>
                                            </div>
                                        )}
                                    />
                                    <FormMessage>{errors.abry_contribution?.message}</FormMessage>
                                </FormItem>
                            </FormControl>

                            <FormControl>
                                <FormItem>
                                    <FormLabel>ESI Contribution</FormLabel>
                                    <Controller
                                        control={control}
                                        name="esi_contribution"
                                        render={({ field: { value, onChange } }) => (
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={Boolean(value)}
                                                    onCheckedChange={(checked) => onChange(checked ? 1 : 0)}
                                                />
                                                <span className="text-sm text-muted-foreground">{value ? 'Enabled' : 'Disabled'}</span>
                                            </div>
                                        )}
                                    />
                                    <FormMessage>{errors.esi_contribution?.message}</FormMessage>
                                </FormItem>
                            </FormControl>
                        </div>


                        <DialogFooter className="flex justify-end space-x-2 pt-4">
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving…' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
