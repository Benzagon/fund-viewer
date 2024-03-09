interface Props {
    fundName: string,
    email: string,
    name: string
}

export default function Navbar ({fundName, email, name}: Props) { //Context?
    return(
        <div className="fixed w-screen bg-white px-20 py-6 flex items-center justify-between border-b border-[#DEE4F0]">
            <h1 className="font-semibold text-h1">{fundName}</h1>
            <div className="flex gap-4 items-center cursor-pointer">
                <div className="flex flex-col items-start gap-1">
                    <h2 className="text-xl font-medium">{name}</h2>
                    <h3 className="text-sm font-medium text-fund-text-gray">{email}</h3>
                </div>
                <span className="material-symbols-outlined">expand_more</span>
            </div>
        </div>
    );
};