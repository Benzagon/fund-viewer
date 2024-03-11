import prisma from "@/lib/prisma";

const calculateNav = (assets: {value: number, coin: string}[], ethPrice: number, btcPrice: number) => {
    let nav = 0;
    for(let i = 0; i < assets.length; i++){
        assets[i].coin === 'BTC' ? (nav += assets[i].value * btcPrice) : (nav += assets[i].value * ethPrice) //Multiply value depending on if its eth or btc
    }
    return nav;
};
const calculateTotalTokens = (tokens: {tokens: number}[]) => {
    let totalTokens = 0;
    for(let i = 0; i < tokens.length; i++){
        totalTokens += tokens[i].tokens;
    }
    return totalTokens;
}

export async function getTokenValue(fundId: number, btcPrice: number, ethPrice: number) {
    try {
        const assets = await prisma.nav.findMany({
            where: {
                fundId
            },
            select: {
                value: true,
                coin: true
            }
        });
        const tokens = await prisma.user.findMany({
            select: {
                tokens: true
            }
        });
        const nav = calculateNav(assets, btcPrice, ethPrice);
        const totalTokens = calculateTotalTokens(tokens);
        
        //Formula for token_value = nav / cantTokens;
        return nav / totalTokens;
    } catch(e: unknown) {
        console.error(`Error fetching token value: ${e}`);
    }
}