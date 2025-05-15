'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
    User,
    Building2,
    KeyRound,
    LogOut,
    ChevronDown,
    ChevronUp,
} from 'lucide-react'
import  useAuth  from '@/hooks/use-Auth'
import { toast } from 'react-toastify'
import { useState } from 'react'

export function Navbar({ title }: { title: string }) {
    const logoutUser = useAuth().logout
    const [open, setOpen] = useState(false)

    return (
        <div className="flex justify-between items-center bg-white w-full p-3">
            <h1 className="text-xl font-semibold">{title}</h1>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        className="flex items-center gap-2 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none"
                    >
                        <User className="w-4 h-4" />
                        Profile
                        {open ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none">
                            <User className="w-4 h-4" />
                            Profile
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none">
                            <Building2 className="w-4 h-4" />
                            Edit Company
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none">
                            <KeyRound className="w-4 h-4" />
                            Change Password
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none hover:bg-red-400"
                            onClick={async () => {
                                await logoutUser()
                                toast.success('Logged out successfully')
                            }}
                        >
                            <LogOut className="w-4 h-4" />
                            Sign out
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
