import { NextRequest, NextResponse } from "next/server";
import {updateAsset} from "./handler";

export async function POST(req: NextRequest) {
    const data: {assets: [string, number][], fundId: number} = await req.json();
    const {assets, fundId} = data;
    const result = await updateAsset(assets, fundId);
    return NextResponse.json({result});
}