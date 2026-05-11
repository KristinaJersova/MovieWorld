import { Router } from "express";
import prisma from "../prisma/prisma.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const ratings = await prisma.rating.findMany({
      include: {
        movies: {
          include: {
            movie: true,
          },
        },
      },
    });

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: "Error loading ratings", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const rating = await prisma.rating.findUnique({
      where: { id },
      include: {
        movies: {
          include: {
            movie: true,
          },
        },
      },
    });

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: "Error loading rating", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { rating, votes, viewer } = req.body;

    const newRating = await prisma.rating.create({
      data: {
        rating: Number(rating),
        votes: Number(votes),
        viewer,
      },
    });

    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: "Error creating rating", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { rating, votes, viewer } = req.body;

    const updatedRating = await prisma.rating.update({
      where: { id },
      data: {
        rating: Number(rating),
        votes: Number(votes),
        viewer,
      },
    });

    res.json(updatedRating);
  } catch (error) {
    res.status(500).json({ message: "Error updating rating", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.rating.delete({
      where: { id },
    });

    res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting rating", error });
  }
});

export default router;