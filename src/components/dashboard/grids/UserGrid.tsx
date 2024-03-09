import { DataCard } from "@/components/cards/DataCard";

const UserGrid = () => {
    return (
        <div className="grid gap-7">
            <div className="flex justify-between gap-2">
                <DataCard name="Current amount" value={240084.09} porcent={2.14}></DataCard>
                <DataCard name="PNL" value={2409} porcent={-2.14}></DataCard>
                <DataCard name="Token value" value={2409} porcent={-2.14}></DataCard>
            </div>
        </div>
    );
};

export default UserGrid;