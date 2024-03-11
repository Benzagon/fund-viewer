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

    let tokenValue: { value: number } = {value: 0};
    const prices = await fetchBtc().then(async (prices) => {
        tokenValue = await fetchTokenValue(fundId || '', prices.btcPrice, prices.ethPrice);
        return prices;
    });

    // const currentAmmount = tokens * tokenValue.value;
    // const PNL = currentAmmount - usdInvested;
    const PNLprcnt = percentage(tokenValue.value, tokenValEntry);
    const btcVar = percentage(prices.btcPrice, btcPriceEntry);

    const alphaBtcPrcnt = Number((PNLprcnt - btcVar).toFixed(2));
    const alphaBtc = usdInvested + usdInvested * (Math.abs(btcVar) / 100);

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