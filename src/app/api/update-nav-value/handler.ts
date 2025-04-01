import prisma from "@/lib/prisma";

//export async function updateAsset(value: number, name: string, fundId: number) {
export async function updateAsset(assets: [string, number][], fundId: number) {
    for (let i = 0; i < assets.length; i++){
        try {
            const asset = await prisma.nav.findFirst({
                where: {
                    name: assets[i][0],
                    fundId: fundId
                }
            });

            if (!asset) {
                throw new Error("Asset not found");
            }
            
            const updatedAsset = await prisma.nav.update({
                where: {
                    id: asset.id
                },
                data: {
                    value: assets[i][1]
                }
            });
            return updatedAsset;
        }
        catch(e: unknown) {
            console.error(`Error updating asset: ${e}`);
        }
    }
}