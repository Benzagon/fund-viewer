import prisma from "@/lib/prisma";

export async function getFundName(id: number) {
    try {
        return await prisma.fund.findUnique({
            where: {
                id
            },
            select: {
                name: true
            }
        })
    } catch(e: unknown) {
        console.error(`Error fetching token data: ${e}`);
    }
}