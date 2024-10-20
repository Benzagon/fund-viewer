import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchAssets, fetchNav, fetchTokenValue } from "@/lib/fetchData";
import { getTotalTokens } from "@/lib/postAdmin";
import { fetchBtc } from "@/lib/fetchBtc";

const Admin = async () => {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const role = session?.user?.role;
  if (role !== "admin") {
    redirect('/')
  }
  //@ts-ignore
  const fundId = session?.user.fundId;

  const assets: Asset[] = await fetchAssets(fundId);
  const tokens: {tokens: number} = await getTotalTokens(fundId);

  let tokenValue: { value: number } = {value: 0};
  const { prices, nav }= await fetchBtc().then(async (prices) => {
    tokenValue = await fetchTokenValue(fundId || '', prices.btcPrice, prices.ethPrice);
    const nav = await fetchNav(fundId || '', prices.btcPrice, prices.ethPrice)
    .then((data) => {
        return data.data
    });
    return { prices, nav };
  });

  return (
    <div className="w-screen flex flex-col gap-4 pt-24 justify-center items-center">
      <div className="flex flex-wrap gap-8 justify-center items-center">
        <h1 className="font-normal text-xl">Total tokens: <span className="font-medium">{tokens.tokens}</span></h1>
        <h1 className="font-normal text-xl">NAV: <span className="font-medium">{'$' + nav.nav.toFixed(2)}</span></h1>
      </div>
      <div className="md:w-[50%] container mx-auto py-10">
        <DataTable fundId={fundId} columns={columns} data={assets} />
      </div>
    </div>
  )
}

export default Admin;