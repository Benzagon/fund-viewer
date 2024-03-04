import { NextRequest, NextResponse } from "next/server";
import { createUser } from "./handler";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const{ email, password, numberId } = data;

    const result = await createUser(email, password, numberId);
    console.log(result)
    return NextResponse.json({data: result});
}