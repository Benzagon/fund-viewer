import { DataCard } from "@/components/cards/DataCard";

const UserGrid = () => {
    return (
        <div className="grid gap-7">
            <div className="flex justify-between gap-2">
                <DataCard name="Current Amount" value={240084.09} porcent={2.14}></DataCard>
                <DataCard name="Current Amount" value={2409} porcent={-2.14}></DataCard>
            </div>
        </div>
    );
};

export default UserGrid;