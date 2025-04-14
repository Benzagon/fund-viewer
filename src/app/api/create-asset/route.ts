import { NextRequest, NextResponse } from "next/server";
import {createAsset} from "./handler";

export async function POST(req: NextRequest) {
    const data: {asset: Asset, fundId: number} = await req.json();
    const {asset, fundId} = data; // Fetch data from req
    const result = await createAsset(asset as Asset, fundId);
    return NextResponse.json({result});
}