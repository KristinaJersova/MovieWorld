import { Request, Response } from "express";
import prisma from "../prisma/prisma.js";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        director: true,
        actors: { include: { actor: true } },
        genres: { include: { genre: true } },
        ratings: { include: { rating: true } },
      },
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error loading movies", error });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const movie = await prisma.movie.findUnique({
      where: { id },
      include: {
        director: true,
        actors: { include: { actor: true } },
        genres: { include: { genre: true } },
        ratings: { include: { rating: true } },
      },
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error loading movie", error });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, year, description, runtime, country, budget, directorId } = req.body;

    const movie = await prisma.movie.create({
      data: {
        title,
        year: Number(year),
        description,
        runtime: Number(runtime),
        country,
        budget: Number(budget),
        directorId: Number(directorId),
      },
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error creating movie", error });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, year, description, runtime, country, budget, directorId } = req.body;

    const movie = await prisma.movie.update({
      where: { id },
      data: {
        title,
        year: Number(year),
        description,
        runtime: Number(runtime),
        country,
        budget: Number(budget),
        directorId: Number(directorId),
      },
    });

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.movie.delete({
      where: { id },
    });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};