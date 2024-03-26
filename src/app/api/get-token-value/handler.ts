import prisma from "@/lib/prisma";

export const calculateTotalTokens = (tokens: {tokens: number}[]) => {
    let totalTokens = 0;
    for(let i = 0; i < tokens.length; i++){
        totalTokens += tokens[i].tokens;
    }
    return totalTokens;
}

export async function getTokenValue(fundId: number, nav: number) {
    try {
        const tokens = await prisma.user.findMany({
            where: {
                fundId: fundId
            },
            select: {
                tokens: true
            }
        });
        // const nav = calculateNav(assets, btcPrice, ethPrice);
        const totalTokens = calculateTotalTokens(tokens);
        
        //Formula for token_value = nav / cantTokens;
        return nav / totalTokens;
    } catch(e: unknown) {
        console.error(`Error fetching token value: ${e}`);
    }
}