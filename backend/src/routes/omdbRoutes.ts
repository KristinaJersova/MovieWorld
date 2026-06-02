import { Router } from "express";
import prisma from "../prisma/prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

const OMDB_URL = "https://www.omdbapi.com/";

router.get("/search", async (req, res) => {
  try {
    const title = req.query.title as string;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const response = await fetch(
      `${OMDB_URL}?apikey=${process.env.OMDB_API_KEY}&t=${encodeURIComponent(
        title
      )}&plot=full&r=json`
    );

    const data = await response.json();

    if (data.Response === "False") {
      return res.status(404).json({ message: data.Error });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "OMDb search error", error });
  }
});

router.post(
  "/import",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }

      const response = await fetch(
        `${OMDB_URL}?apikey=${process.env.OMDB_API_KEY}&t=${encodeURIComponent(
          title
        )}&plot=full&r=json`
      );

      const data = await response.json();

      if (data.Response === "False") {
        return res.status(404).json({ message: data.Error });
      }

      const director = await prisma.director.upsert({
        where: { name: data.Director },
        update: {},
        create: { name: data.Director },
      });

      const runtime = Number(data.Runtime?.replace(" min", "")) || 0;
      const year = Number(data.Year) || 0;
      const rating = Number(data.imdbRating) || 0;
      const votes = Number(data.imdbVotes?.replaceAll(",", "")) || 0;
      const budget =
        Number(data.BoxOffice?.replaceAll("$", "").replaceAll(",", "")) || 0;

      const movie = await prisma.movie.create({
        data: {
          title: data.Title,
          year,
          description: data.Plot,
          runtime,
          country: data.Country,
          budget,
          directorId: director.id,
        },
      });

      const genres = data.Genre.split(",").map((g: string) => g.trim());

      for (const genreName of genres) {
        const genre = await prisma.genre.upsert({
          where: { name: genreName },
          update: {},
          create: { name: genreName },
        });

        await prisma.movieGenre.create({
          data: {
            movieId: movie.id,
            genreId: genre.id,
          },
        });
      }

      const actors = data.Actors.split(",").map((a: string) => a.trim());

      for (const actorName of actors) {
        const actor = await prisma.actor.upsert({
          where: { name: actorName },
          update: {},
          create: { name: actorName },
        });

        await prisma.movieActor.create({
          data: {
            movieId: movie.id,
            actorId: actor.id,
          },
        });
      }

      const newRating = await prisma.rating.create({
        data: {
          rating,
          votes,
          viewer: "IMDb users",
        },
      });

      await prisma.movieRating.create({
        data: {
          movieId: movie.id,
          ratingId: newRating.id,
        },
      });

      const fullMovie = await prisma.movie.findUnique({
        where: { id: movie.id },
        include: {
          director: true,
          actors: { include: { actor: true } },
          genres: { include: { genre: true } },
          ratings: { include: { rating: true } },
        },
      });

      res.status(201).json({
        message: "Movie imported successfully",
        movie: fullMovie,
      });
    } catch (error) {
      res.status(500).json({ message: "OMDb import error", error });
    }
  }
);

export default router;