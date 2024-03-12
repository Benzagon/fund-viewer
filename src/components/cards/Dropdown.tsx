'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";  
import { signOut } from "next-auth/react";

const Dropdown = ({name, email}: {name: string, email: string}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex gap-4 items-center cursor-pointer">
                    <div className="flex flex-col items-start gap-1">
                        <h2 className="3xl:text-xl text-base font-medium">{name}</h2>
                        <h3 className="text-sm font-medium text-fund-text-gray">{email}</h3>
                    </div>
                    <span className="material-symbols-outlined">expand_more</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="cursor-default">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">{`Signout`}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Dropdown;