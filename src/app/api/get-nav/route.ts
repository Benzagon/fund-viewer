import { NextRequest, NextResponse } from "next/server";
import { getNav } from "./handler";

export async function GET(req: NextRequest) {
    const fundId = Number(req.nextUrl.searchParams.get('fundId') as string);
    const btcPrice = Number(req.nextUrl.searchParams.get('eth') as string);
    const ethPrice = Number(req.nextUrl.searchParams.get('btc') as string);
    
    const data = await getNav(fundId, btcPrice, ethPrice);
    return NextResponse.json({data});  
}