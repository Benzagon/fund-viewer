//SERVER COMPONENT
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import Signout from "@/components/Signout";

// async function getMovies() {
//   const result = await prisma.movie.findMany();
//   return result;
// }

export default async function Home() {
  const session = await getServerSession(authOptions);
  // const movies = await getMovies();
  return (
    <>
      <h1 className="text-xl font-semibold mb-2">{`Hi, there ${session?.user?.email}`}</h1>
      {/* {movies.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <h1>{movie.year}</h1>
        </div>
      ))
      } */}
      <Signout></Signout>
    </>
  );
}