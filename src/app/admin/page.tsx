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

  const assets: Asset[] = await fetchAssets(fundId);
  // const assets: Asset[] = [
  //   {
  //     id: 'aaa',
  //     name: 'test',
  //     value: 20,
  //     coin: 'BTC'
  //   }
  // ]
  
  return (
    <div className="w-screen flex justify-center items-center">
      <div className="md:w-[50%] container mx-auto py-10">
        <DataTable fundId={fundId} columns={columns} data={assets} />
      </div>
    </div>
  )
}

export default Admin;