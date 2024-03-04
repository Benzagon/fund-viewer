import { NextRequest, NextResponse } from "next/server";
import { createUser } from "./handler";

export async function POST(req: NextRequest) {
    const data: {user: User, password: string} = await req.json();
    const{ user, password } = data;

    const result = await createUser(user as User, password);
    console.log(result)
    return NextResponse.json({data: result});
}   