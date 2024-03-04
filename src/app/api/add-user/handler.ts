import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function createUser( email: string, password: string, fundId: number ) {
    try {
        const hashedPassword = await hash(password, 12);
        return await prisma.user.create(
            { 
                data: 
                {
                    email, 
                    hash: hashedPassword,
                    fund: {
                        connect: {
                            id: fundId
                        }
                    }
                }
            });
    } catch(e: unknown) {
        console.error(`Error creating user: ${e}`);
    }
}