import CreateForm from "@/components/create/CreateUser"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const role = session?.user?.role;
  if (role !== "admin") {
    redirect('/')
    return (
      <>
      </>
    )
  }
  return (
    <>
      <CreateForm></CreateForm>
    </>
  )
}

export default Page;