import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import CryptoPrice from "@/components/cards/CyptoPrice";
import { LargeDataCard } from "@/components/cards/DataCard";
import PieChart from "@/components/graphs/PieChart";
import { fetchBtc } from "@/lib/fetchBtc";
import { fetchNav, fetchTokenData, fetchTokenValue } from "@/lib/fetchData";
import { percentage } from "@/lib/utils";
import { getServerSession } from "next-auth";

const AssetGrid = async () => {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const id = session?.user?.id;
    //@ts-ignore
    const fundId = session?.user.fundId;

    const tokenData = await fetchTokenData(id || '');
    const { usdInvested, tokenValEntry, btcPriceEntry } = tokenData.data;

    let tokenValue: { value: number } = {value: 0};
    // let nav_assets: {name: string, value: number}[] = [];

    const { prices, nav }= await fetchBtc().then(async (prices) => {
        tokenValue = await fetchTokenValue(fundId || '', prices.btcPrice, prices.ethPrice);
        const nav = await fetchNav(fundId || '', prices.btcPrice, prices.ethPrice)
        .then((data) => {
            return data.data
        });
        return { prices, nav };
    });
    // const currentAmmount = tokens * tokenValue.value;
    // const PNL = currentAmmount - usdInvested;
    const PNLprcnt = percentage(tokenValue.value, tokenValEntry);
    const btcVar = percentage(prices.btcPrice, btcPriceEntry);

    const alphaBtcPrcnt = Number((PNLprcnt - btcVar).toFixed(2));
    const alphaBtc = usdInvested + usdInvested * (Math.abs(btcVar) / 100);

    return (
       <div className="grid 3xl:gap-7 gap-5">
            <div className="flex justify-between gap-5">
                <CryptoPrice btcPriceEntry={btcPriceEntry} pnl={PNLprcnt}></CryptoPrice>
                <LargeDataCard name="Alpha BTC" value={alphaBtc} porcent={alphaBtcPrcnt}></LargeDataCard>
            </div>
            <PieChart assets={nav.assets_value} nav={nav.nav}></PieChart>
       </div>
    )
}

export default AssetGrid;