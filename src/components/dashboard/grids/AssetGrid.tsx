import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import CryptoPrice from "@/components/cards/CyptoPrice";
import { LargeDataCard } from "@/components/cards/DataCard";
import { fetchBtc } from "@/lib/fetchBtc";
import { fetchTokenData, fetchTokenValue } from "@/lib/fetchData";
import { percentage } from "@/lib/utils";
import { getServerSession } from "next-auth";

const AssetGrid = async () => {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const id = session?.user?.id;
    //@ts-ignore
    const fundId = session?.user.fundId;

    const tokenData = await fetchTokenData(id || '');
    const { tokens, usdInvested, tokenValEntry, btcPriceEntry } = tokenData.data;

    const tokenValue: { value: number } = await fetchTokenValue(fundId || '');
    const currentAmmount = tokens * tokenValue.value;
    // const PNL = currentAmmount - usdInvested;
    const PNLprcnt = tokenValue.value / tokenValEntry

    const prices = await fetchBtc();
    const alphaBtcPrcnt = Number((PNLprcnt - percentage(prices.btcPrice, btcPriceEntry)).toFixed(2));
    const alphaBtc = usdInvested + usdInvested * (Math.abs(alphaBtcPrcnt) / 100);

    return (
       <div className="grid gap-7">
            <div className="flex justify-between gap-5">
                <CryptoPrice btcPriceEntry={btcPriceEntry} pnl={PNLprcnt}></CryptoPrice>
                <LargeDataCard name="Alpha BTC" value={alphaBtc} porcent={alphaBtcPrcnt}></LargeDataCard>
            </div>
       </div>
    )
}

export default AssetGrid;