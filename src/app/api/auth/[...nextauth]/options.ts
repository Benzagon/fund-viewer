import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
                //Retrieve credentials from db
                const user ={ id: '42', email: "gonza@gmail.com", password: "1234"};

                if(credentials?.email === user.email && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
}