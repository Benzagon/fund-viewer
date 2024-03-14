import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import Navbar from "@/components/dashboard/Navbar";
import UserGrid from "@/components/dashboard/grids/UserGrid";
import AssetGrid from "@/components/dashboard/grids/AssetGrid";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  return (
    <>
      <Navbar fundName={'KB Capital'} email={email || 'Undefined'} name={session?.user?.name || 'Undefined'}></Navbar>
      <div className="w-screen 2xl:pt-32 pt-24 grid 3xl:gap-10 2xl:gap-8 gap-4 2xl:px-20 px-12">
        <div className="flex flex-col gap-0">
          <h1 className="font-medium 3xl:text-h1 text-2xl">Dashboard</h1>
          <h3 className="font-normal 3xl:text-xl text-base text-fund-text-gray">View the overall fund performance</h3>
        </div>
        <div className="flex flex-wrap justify-between items-start">
          <UserGrid></UserGrid>
          <AssetGrid></AssetGrid>
        </div>
      </div>
    </>
  );
}