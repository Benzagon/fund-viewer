import { NextRequest, NextResponse } from "next/server";
import { deleteAssetData } from "./handler";

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id') as string;
    const result = await deleteAssetData(id);
    return NextResponse.json(result);
}