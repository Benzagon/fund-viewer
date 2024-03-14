import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "Email..."
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Password..."
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password) {
                    return null;
                };

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user){
                    return null;
                };

                const isPasswordValid = await compare(
                    credentials.password,
                    user.hash
                );

                if(!isPasswordValid){
                    return null
                };

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    tokens: user.tokens,
                    role: user.role,
                    fundId: user.fundId
                };
            }
        })
    ],
    callbacks: {
        async jwt({token, user, session}) {
            if(user){
                return {
                    ...token,
                    id: user.id,
                    fundId: (user as User).fundId,
                    role: (user as User).role || ''
                }
            }
            return token
        },
        async session({session, token, user}){
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    fundId: token.fundId,
                    role: token.role
                }
            };
        }
    },
    pages: {
        signIn: "/login"
    }
}