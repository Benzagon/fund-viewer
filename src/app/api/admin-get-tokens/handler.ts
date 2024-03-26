import prisma from "@/lib/prisma";
import { calculateTotalTokens } from "../get-token-value/handler";

export async function getTokens(fundId: number) {
    try {
        const tokens = await prisma.user.findMany({
            where: {
                fundId: fundId
            },
            select: {
                tokens: true
            }
        });
        return calculateTotalTokens(tokens)
    } catch (e: unknown){
        console.error(`Error fetching token value: ${e}`);
    }
}