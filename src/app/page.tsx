//SERVER COMPONENT
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import Signout from "@/components/Signout";
import CryptoPrice from "@/components/CyptoPrice";
import ValueChart from "@/components/graphs/ValueChart";
import PieChart from "@/components/graphs/PieChart";
import Navbar from "@/components/dashboard/Navbar";

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
    <>
      <Navbar fundName={'KB Capital'} email={session?.user?.email || 'null'} name={session?.user?.name || 'null'}></Navbar>
      <div className="w-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold mb-2">{`Hi, there ${session?.user?.name}`}</h1>
        <h2 className="text-lg font-medium mb-2">{`You have: ${tokens} tokens`}</h2>
        <CryptoPrice></CryptoPrice>
        <ValueChart></ValueChart>
        <PieChart></PieChart>
        <Signout></Signout>
    </div>
    </>
  );
}