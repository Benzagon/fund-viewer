import prisma from "@/lib/prisma";

export async function getAssetData(fundId: number) {
    try {
        const assets = await prisma.nav.findMany({
            where: {
                fundId
            },
            select: {
                id: true,
                value: true,
                name: true,
                coin: true
            }
        });
        return assets;
    }
    catch(e: unknown) {
        console.error(`Error fetching assets: ${e}`);
    }
}