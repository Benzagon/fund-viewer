import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import Navbar from "@/components/dashboard/Navbar";
import UserGrid from "@/components/dashboard/grids/UserGrid";
import AssetGrid from "@/components/dashboard/grids/AssetGrid";
import { fetchFundName } from "@/lib/fetchData";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  //@ts-ignore
  const fundId = session?.user.fundId;

  const fundData = await fetchFundName(fundId);
  
  return (
    <>
      <Navbar fundName={fundData.data.name || 'BLC Capital'} email={email || 'Undefined'} name={session?.user?.name || 'Undefined'}></Navbar>
      <div className="w-screen 2xl:pt-32 pt-24 grid xl:justify-normal justify-center 3xl:gap-10 2xl:gap-8 gap-4 2xl:px-20 sm:px-12 px-6 sm:mb-0 mb-8">
        <div className="flex flex-col gap-0">
          <h1 className="font-medium 3xl:text-h1 sm:text-2xl text-xl">Dashboard</h1>
          <h3 className="font-normal 3xl:text-xl sm:text-base text-sm text-fund-text-gray">View the overall fund performance</h3>
        </div>
        <div className="flex xl:flex-row flex-col-reverse xl:gap-8 gap-8 justify-start xl:items-start base:items-center">
          <AssetGrid></AssetGrid>
          <UserGrid></UserGrid>
        </div>
      </div>
    </>
  );
}