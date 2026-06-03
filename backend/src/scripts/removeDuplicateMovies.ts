import prisma from "../prisma/prisma.js";

async function main() {
  const movies = await prisma.movie.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const seen = new Map<string, number>();
  const duplicates: number[] = [];

  for (const movie of movies) {
    const key = `${movie.title.toLowerCase().trim()}-${movie.year}`;

    if (seen.has(key)) {
      duplicates.push(movie.id);
    } else {
      seen.set(key, movie.id);
    }
  }

  console.log("Duplicate IDs:", duplicates);

  for (const movieId of duplicates) {
    await prisma.movieActor.deleteMany({ where: { movieId } });
    await prisma.movieGenre.deleteMany({ where: { movieId } });
    await prisma.movieRating.deleteMany({ where: { movieId } });

    await prisma.movie.delete({
      where: { id: movieId },
    });

    console.log(`Deleted movie ${movieId}`);
  }

  console.log("Done");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });