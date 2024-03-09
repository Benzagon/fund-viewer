import prisma from "@/lib/prisma";

const calculateNav = (assets: {value: number}[]) => {
    let nav = 0;
    for(let i = 0; i < assets.length; i++){
        nav += assets[i].value;
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

export async function getTokenValue(fundId: number) {
    try {
        const assets = await prisma.nav.findMany({
            where: {
                fundId
            },
            select: {
                value: true
            }
        });
        const tokens = await prisma.user.findMany({
            select: {
                tokens: true
            }
        });
        const nav = calculateNav(assets);
        const totalTokens = calculateTotalTokens(tokens);
        
        //token_value = nav / cantTokens;
        return nav / totalTokens;
    } catch(e: unknown) {
        console.error(`Error fetching token value: ${e}`);
    }
}