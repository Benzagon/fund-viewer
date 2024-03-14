import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function createUser( user: User , password: string,) {
    try {
        const hashedPassword = await hash(password, 12);
        return await prisma.user.create(
            { 
                data: 
                {
                    email: user.email, 
                    hash: hashedPassword,
                    name: user.name,
                    tokens: user.tokens,
                    usdInvested: user.usdInvested,
                    btcPriceEntry: user.btcPriceEntry,
                    tokenValEntry: user.tokenValEntry,
                    role: user.role,
                    fund: {
                        connect: {
                            id: user.fundId
                        }
                    }
                }
            });
    } catch(e: unknown) {
        console.error(`Error creating user: ${e}`);
    }
}