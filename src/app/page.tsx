//SERVER COMPONENT

import prisma from "@/lib/prisma";

async function getMovies() {
  const result = await prisma.movie.findMany();
  return result;
}

export default async function Home() {
  const movies = await getMovies();
  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <h1>{movie.year}</h1>
        </div>
      ))
      }
    </>
  );
}
