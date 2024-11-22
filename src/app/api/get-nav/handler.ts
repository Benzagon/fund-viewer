import prisma from "@/lib/prisma";

const calculateNav = (assets: {value: number, coin: string, name: string}[], ethPrice: number, btcPrice: number) => {
    let nav = 0;
    let assets_value: {name: string, value: number}[] = [];
    for(let i = 0; i < assets.length; i++){
        let value = 0
        //Multiply value depending on if its eth or btc
        if (assets[i].coin === 'BTC') { value = assets[i].value * btcPrice }
        else if (assets[i].coin === 'ETH') { value = assets[i].value * ethPrice }
        else { value = assets[i].value }
        nav += value;
        assets_value.push({name: assets[i].name, value});
    }
    return {nav, assets_value};
};

export async function getNav(fundId: number, btcPrice: number, ethPrice: number) {
    try {
        const assets = await prisma.nav.findMany({
            where: {
                fundId
            },
            select: {
                value: true,
                name: true,
                coin: true
            }
        });
        const { nav, assets_value } = calculateNav(assets, btcPrice, ethPrice);

        return { nav, assets_value }
    } catch(e: unknown) {
        console.error(`Error fetching nav value: ${e}`);
    }
}