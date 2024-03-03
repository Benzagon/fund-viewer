import { NextRequest, NextResponse } from "next/server";
import { createMovie } from "./handler";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const{ name, year } = data;

    const result = await createMovie(name, year);
    console.log(result)
    return NextResponse.json({data: result});
}