//SERVER COMPONENT
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import Signout from "@/components/Signout";
import ValueChart from "@/components/graphs/ValueChart";
import PieChart from "@/components/graphs/PieChart";
import Navbar from "@/components/dashboard/Navbar";
import UserGrid from "@/components/dashboard/grids/UserGrid";
import AssetGrid from "@/components/dashboard/grids/AssetGrid";

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
  const email = session?.user?.email;
  return (
    <>
      <Navbar fundName={'KB Capital'} email={email || 'Undefined'} name={session?.user?.name || 'Undefined'}></Navbar>
      <div className="w-screen pt-32 grid 3xl:gap-10 gap-8 px-20">
        <div className="flex flex-col gap-0">
          <h1 className="font-medium 3xl:text-h1 text-2xl">Dashboard</h1>
          <h3 className="font-normal 3xl:text-xl text-base text-fund-text-gray">View the overall fund performance</h3>
        </div>
        <div className="flex flex-wrap gap-8 justify-between items-start">
          <UserGrid></UserGrid>
          <AssetGrid></AssetGrid>
        </div>
        {/* <div className="flex flex-col items-center justify-center pt-36">
          <h1 className="text-xl font-semibold mb-2">{`Hi, there ${session?.user?.name}`}</h1>
          <h2 className="text-lg font-medium mb-2">{`You have: ${tokens} tokens`}</h2>
          <CryptoPrice></CryptoPrice>
          <ValueChart></ValueChart>
          <PieChart></PieChart>
          <Signout></Signout>
        </div> */}
      </div>
    </>
  );
}