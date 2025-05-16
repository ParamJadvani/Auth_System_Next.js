import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl } from '@/components/ui/form';
import { IconInput } from '@/components/ui/iconInput';
import { Separator } from '@/components/ui/separator';
import { IChangePasswordValues } from '@/types/auth';
import { useForm } from 'react-hook-form';

export function ChangePasswordDialog({ onSubmit }: { onSubmit: (data: IChangePasswordValues) => void; }) {
    const form = useForm<IChangePasswordValues>({
        defaultValues: {
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
        }
    })

    return <div>
        <DialogContent>
            <Card className="border-0 shadow-none">
                <CardHeader>
                    <DialogTitle className='text-2xl'>Change Password</DialogTitle>
                    <Separator className='bg-gray-500/50 ' />
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-8">
                            <div className="flex flex-col space-y-5">
                                <FormControl className='space-y-1'>
                                    <IconInput
                                        label='Current Password'
                                        id="current_password"
                                        placeholder="Current Password"
                                        type='password'
                                        {...form.register("current_password")}
                                    />
                                </FormControl>
                                <FormControl className='space-y-1'>
                                    <IconInput
                                        label='New Password'
                                        id="new_password"
                                        placeholder="New Password"
                                        type='password'
                                        {...form.register("new_password")}
                                    />
                                </FormControl>
                                <FormControl className='space-y-1'>
                                    <IconInput
                                        label='Confirm New Password'
                                        id="new_password_confirmation"
                                        placeholder="Confirm New Password"
                                        type='password'
                                        {...form.register("new_password_confirmation")}
                                    />
                                </FormControl>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2 mt-7">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Saving..." : "Save"}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </DialogContent>
    </div>
}