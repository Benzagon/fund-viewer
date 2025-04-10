import prisma from "@/lib/prisma";

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
                //console.log("No se encontro el asset: " + assets[i][0])
            }
            else{
            
                const updatedAsset = await prisma.nav.update({
                    where: {
                        id: asset.id
                    },
                    data: {
                        value: assets[i][1]
                    }
                });
                
                console.log(asset, i)
                //return updatedAsset;
            }
        }
        catch(e: unknown) {
            console.error(`Error updating asset: ${e}`);
        }
    }
}