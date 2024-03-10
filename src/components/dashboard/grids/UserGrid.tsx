import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { DataCard, LargeDataCard } from "@/components/cards/DataCard";
import { getServerSession } from "next-auth";
import { percentage } from "@/lib/utils";
import CryptoPrice from "@/components/cards/CyptoPrice";

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
    const tokenValue: { value: number } = await fetchTokenValue(fundId || '');
    const { tokens, usdInvested, tokenValEntry, btcPriceEntry } = tokenData.data;

    const currentAmmount = tokens * tokenValue.value;
    const PNL = currentAmmount - usdInvested;
    const PNLprcnt = tokenValue.value / tokenValEntry
    return (
        <div className="grid gap-7">
            <div className="flex justify-between gap-2">
                <DataCard name="Current amount" value={currentAmmount} porcent={percentage(currentAmmount, usdInvested)}></DataCard>
                <DataCard name="PNL" value={PNL} porcent={PNLprcnt}></DataCard>
                <DataCard name="Token value" value={tokenValue.value} porcent={percentage(tokenValue.value,tokenValEntry)}></DataCard>
            </div>
            <div className="flex justify-between gap-2">
                <CryptoPrice btcPriceEntry={btcPriceEntry} pnl={PNLprcnt}></CryptoPrice>
            </div>
        </div>
    );
};

export default UserGrid;