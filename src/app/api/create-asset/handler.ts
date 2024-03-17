import prisma from "@/lib/prisma";

export async function createAsset(asset: Asset, fundId: number) {
    try {
        return await prisma.nav.create({
            data: {
                fundId,
                name: asset.name,
                value: asset.value,
                coin: asset.coin
            }
        });
    }
    catch(e: unknown) {
        console.error(`Error creating asset: ${e}`);
    }
}