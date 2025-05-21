"use client"
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { DialogClose } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export function FormFooter({ editing, submitting }: { editing: boolean; submitting: boolean }) {
    const router = useRouter();
    return <CardFooter
        className={`${editing ? "fixed bottom-0 left-0 right-0" : "sticky bottom-0"} z-50 py-3 sm:py-4 border-gray-200`}
    >
        <div className="flex justify-end space-x-2 sm:space-x-3 mx-auto w-full px-4 sm:px-6">
            {editing ? (
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 text-sm px-3 py-2 sm:px-4 sm:py-2 flex-1 sm:flex-none"
                    disabled={submitting}
                >
                    Cancel
                </Button>
            ) : (
                <DialogClose asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 text-sm px-3 py-2 sm:px-4 sm:py-2 flex-1 sm:flex-none"
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                </DialogClose>
            )}
            <Button
                type="submit"
                disabled={submitting}
                loading={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 sm:px-4 sm:py-2 flex-1 sm:flex-none"
            >
                Save
            </Button>
        </div>
    </CardFooter>
}