import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { DataCard } from "@/components/cards/DataCard";
import { getServerSession } from "next-auth";
import { percentage } from "@/lib/utils";
import { fetchTokenData, fetchTokenValue } from "@/lib/fetchData";
import { fetchBtc } from "@/lib/fetchBtc";
import ValueChart from "@/components/graphs/ValueChart";
import AreaChartCard from "@/components/cards/AreaChartCard";


const UserGrid = async () => {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const id = session?.user?.id;
    //@ts-ignore
    const fundId = session?.user.fundId;
    let tokenValue: { value: number } = {value: 0};

    await fetchBtc().then(async (prices) => {
        tokenValue = await fetchTokenValue(fundId || '', prices.btcPrice, prices.ethPrice);
    });
    
    const tokenData = await fetchTokenData(id || '');
    const { tokens, usdInvested, tokenValEntry } = tokenData.data;

    const currentAmmount = tokens * tokenValue.value;
    const PNL = currentAmmount - usdInvested;
    const PNLprcnt = percentage(tokenValue.value, tokenValEntry);

    return (
        <div className="grid gap-4 h-full">
            <div className="flex base:flex-row flex-col base:items-start items-center justify-between gap-2">
                <DataCard name="Current amount" value={currentAmmount} porcent={percentage(currentAmmount, usdInvested)}></DataCard>
                <DataCard name="PNL" value={PNL} porcent={PNLprcnt}></DataCard>
                <DataCard name="Token value" value={tokenValue.value} porcent={percentage(tokenValue.value,tokenValEntry)}></DataCard>
            </div>
            <div>
                <AreaChartCard></AreaChartCard>
            </div>
        </div>
    );
};

export default UserGrid;