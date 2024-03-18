'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";  
import { signOut } from "next-auth/react";

const Dropdown = ({name, email}: {name: string, email: string}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus:outline-0">
                <div className="flex gap-4 items-center cursor-pointer">
                    <div className="sm:flex flex-col items-start gap-1 hidden">
                        <h2 className="3xl:text-xl md:text-base text-sm font-medium">{name}</h2>
                        <h3 className="text-sm font-medium text-fund-text-gray">{email}</h3>
                    </div>
                    <span className="material-symbols-outlined sm:w-auto w-20 text-end">expand_more</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuLabel className="cursor-default">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">{`Signout`}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Dropdown;