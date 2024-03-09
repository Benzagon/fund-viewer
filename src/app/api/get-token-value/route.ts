import { NextRequest, NextResponse } from "next/server";
import { getTokenValue } from "./handler";

export async function GET(req: NextRequest) {
    const fundId = req.nextUrl.searchParams.get('fundId') as string;
    const value = await getTokenValue(Number(fundId));
    return NextResponse.json({value});  
}