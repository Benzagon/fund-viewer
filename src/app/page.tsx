//SERVER COMPONENT
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import Signout from "@/components/Signout";
import BtcPrice from "@/components/BtcPrice";

async function getTokens(email: string) { //Change to id
  const result = await prisma.user.findUnique({
    where: {
      email
    }
  });
  return result?.tokens;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const tokens = await getTokens(session?.user?.email || '');
  return (
    <div className="w-screen flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-semibold mb-2">{`Hi, there ${session?.user?.name}`}</h1>
      <h2 className="text-lg font-medium mb-2">{`You have: ${tokens} tokens`}</h2>
      <BtcPrice></BtcPrice>
      <Signout></Signout>
    </div>
  );
}