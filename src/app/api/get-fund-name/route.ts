import { NextRequest, NextResponse } from "next/server";
import { getFundName } from "./handler";

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('fundId') as string;
    const data = await getFundName(Number(id));
    return NextResponse.json({data});  
}