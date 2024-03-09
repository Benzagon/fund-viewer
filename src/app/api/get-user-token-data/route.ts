import { NextRequest, NextResponse } from "next/server";
import { getUserTokenData } from "./handler";

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id') as string;
    const data = await getUserTokenData(id);
    return NextResponse.json({data});  
}