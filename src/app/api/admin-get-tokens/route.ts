import { NextRequest, NextResponse } from "next/server";
import { getTokens } from "./handler";

export async function GET(req: NextRequest) {
    const fundId = Number(req.nextUrl.searchParams.get('fundId') as string);
    const tokens = await getTokens(fundId);
   
    return NextResponse.json({tokens});  
}