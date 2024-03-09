import prisma from "@/lib/prisma";

export async function getUserTokenData(id: string) {
    try {
        return await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                usdInvested: true,
                tokens: true,
                tokenValEntry: true,
            }
        })
    } catch(e: unknown) {
        console.error(`Error fetching token data: ${e}`);
    }
}