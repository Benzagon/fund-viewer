import prisma from "@/lib/prisma";

export async function createMovie( title: string, year: string ) {
    try {
        return await prisma.movie.create({ data: {title, year} });
    } catch(e: unknown) {
        console.error(`Error creating movie: ${e}`);
    }
}