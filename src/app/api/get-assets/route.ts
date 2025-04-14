import { NextRequest, NextResponse } from "next/server";
import { getAssetData } from "./handler";

export async function GET(req: NextRequest) {
    const fundId = Number(req.nextUrl.searchParams.get('fundId') as string);

    const data = await getAssetData(fundId);
    console.log(data)
    return NextResponse.json(data);
}