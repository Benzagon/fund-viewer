import LoginForm from "@/components/login/loginForm"
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
      <LoginForm></LoginForm>
    </>
  )
}

export default Page;