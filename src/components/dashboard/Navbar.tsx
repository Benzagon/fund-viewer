import Link from "next/link";
import Dropdown from "../cards/Dropdown";
import { Button } from "../ui/button";

interface Props {
    fundName: string,
    email: string,
    name: string,
    role: string | undefined
}

export default function Navbar ({fundName, email, name, role}: Props) { //Context?
    return(
        <div className="fixed z-50 w-screen bg-white 2xl:px-20 sm:px-12 px-6 2xl:py-6 py-4 flex items-center justify-between border-b border-[#DEE4F0]">
            <h1 className="font-semibold 3xl:text-h1 md:text-2xl text-xl">{fundName}</h1>
            <div className="flex gap-6 items-center justify-end">
                {role === 'admin' &&
                    <Button className="p-0 py-0">
                        <Link href={"/admin"} className="h-full mx-4 flex items-center justify-center">Admin Dashboard</Link>
                    </Button>
                }
                <Dropdown name={name} email={email}></Dropdown>
            </div>
        </div>
    );
};