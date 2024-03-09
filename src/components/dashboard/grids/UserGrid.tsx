import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { DataCard } from "@/components/cards/DataCard";
import { getServerSession } from "next-auth";

const fetchTokenData = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/get-user-token-data/?id=${id}`);
    if(!res.ok) throw new Error('Failed to fetch user token data');
    return await res.json();
}

const fetchTokenValue = async (fundId: string) => {
    const res = await fetch(`http://localhost:3000/api/get-token-value/?fundId=${fundId}`);
    if(!res.ok) throw new Error('Failed to fetch user token data');
    return await res.json();
}

const UserGrid = async () => {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const id = session?.user?.id;
    //@ts-ignore
    const fundId = session?.user.fundId;

    const tokenData = await fetchTokenData(id || '');
    const tokenValue: {value: number} = await fetchTokenValue(fundId || '');
    const {tokens} = tokenData.data;

    return (
        <div className="grid gap-7">
            <div className="flex justify-between gap-2">
                <DataCard name="Current amount" value={tokens * tokenValue.value} porcent={2.14}></DataCard>
                <DataCard name="PNL" value={2409} porcent={-2.14}></DataCard>
                <DataCard name="Token value" value={tokenValue.value} porcent={tokenValue.value/100 * 100}></DataCard>
            </div>
        </div>
    );
};

export default UserGrid;