import prisma from "@/lib/prisma";

export async function deleteAssetData(id: string) {
    try {
        const asset = await prisma.nav.delete({
            where: {
                id
            }
        });
        return asset;
    }
    catch(e: unknown) {
        console.error(`Error deleting asset: ${e}`);
    }
}