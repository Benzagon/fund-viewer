import Dropdown from "../cards/Dropdown";

interface Props {
    fundName: string,
    email: string,
    name: string
}

export default function Navbar ({fundName, email, name}: Props) { //Context?
    return(
        <div className="fixed w-screen bg-white px-20 py-6 flex items-center justify-between border-b border-[#DEE4F0]">
            <h1 className="font-semibold 3xl:text-h1 text-2xl">{fundName}</h1>
            <Dropdown name={name} email={email}></Dropdown>
        </div>
    );
};