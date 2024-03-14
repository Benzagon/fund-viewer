import Dropdown from "../cards/Dropdown";

interface Props {
    fundName: string,
    email: string,
    name: string
}

export default function Navbar ({fundName, email, name}: Props) { //Context?
    return(
        <div className="fixed z-50 w-screen bg-white 2xl:px-20 px-12 2xl:py-6 py-4 flex items-center justify-between border-b border-[#DEE4F0]">
            <h1 className="font-semibold 3xl:text-h1 text-2xl">{fundName}</h1>
            <Dropdown name={name} email={email}></Dropdown>
        </div>
    );
};