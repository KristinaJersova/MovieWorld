import { Router } from "express";
import prisma from "../prisma/prisma.js";

const router = Router();

router.post("/:movieId/actors/:actorId", async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);
    const actorId = Number(req.params.actorId);

    const relation = await prisma.movieActor.create({
      data: { movieId, actorId },
      include: { movie: true, actor: true },
    });

    res.status(201).json(relation);
  } catch (error) {
    res.status(500).json({ message: "Error adding actor to movie", error });
  }
});

router.post("/:movieId/genres/:genreId", async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);
    const genreId = Number(req.params.genreId);

    const relation = await prisma.movieGenre.create({
      data: { movieId, genreId },
      include: { movie: true, genre: true },
    });

    res.status(201).json(relation);
  } catch (error) {
    res.status(500).json({ message: "Error adding genre to movie", error });
  }
});

router.post("/:movieId/ratings", async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);
    const { rating, votes, viewer } = req.body;

    const newRating = await prisma.rating.create({
      data: {
        rating: Number(rating),
        votes: Number(votes),
        viewer,
      },
    });

    const relation = await prisma.movieRating.create({
      data: {
        movieId,
        ratingId: newRating.id,
      },
      include: {
        movie: true,
        rating: true,
      },
    });

    res.status(201).json(relation);
  } catch (error) {
    res.status(500).json({ message: "Error adding rating to movie", error });
  }
});

export default router;