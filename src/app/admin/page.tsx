import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchAssets } from "@/lib/fetchData";

const Admin = async () => {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const role = session?.user?.role;
  if (role !== "admin") {
    redirect('/')
  }
  //@ts-ignore
  const fundId = session?.user.fundId;


// const assets: Asset[] = [
//     {
//       id: "728ed52f",
//       name: "Bitcoin",
//       value: 20.5,
//       coin: 'BTC'
//     },
//     {
//       id: "7282ed52f",
//       name: "Ethereum",
//       value: 9.4,
//       coin: 'ETH'
//     },
//     {
//       id: "728ed52f",
//       name: "Bitcoin",
//       value: 20.5,
//       coin: 'BTC'
//     },
//   ]

  const assets: Asset[] = await fetchAssets(fundId);
  
  return (
    <div className="w-screen flex justify-center items-center">
      <div className="md:w-[50%] container mx-auto py-10">
        <DataTable columns={columns} data={assets} />
      </div>
    </div>
  )
}

export default Admin;